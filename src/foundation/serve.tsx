// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义服务器端接口应用服务器及其运行模式
//
// @authors hjboss <hongjiangproject@gmail.com> 2017-12 $$
import * as bodyParser from 'body-parser'
import * as compression from 'compression'
import * as cookieParser from 'cookie-parser'
import * as express from 'express'
import * as fileStreamRotator from 'file-stream-rotator'
import * as fs from 'fs'
import * as http from 'http'
import * as morgan from 'morgan'
import * as multiparty from 'connect-multiparty'
import * as path from 'path'
import * as pm from 'pm'
import log from './log'
import payment from './payment'
import request from './request'
import response, { IResult } from './response'
import token from './token'
import utils from './utils'
import dev from './dev'
import appid from '../config/appid'
import setting from '../config/setting'
import upload from '../api/imgUpload/upload';

export default class serve {
        constructor(private configures: any) {
                this.configures = configures || {}
                this.configures.mappings = {}

                for (let route of this.configures.routes) {
                        this.configures.mappings[route.path] = route
                }
        }

        // 创建单实例的HTTP应用服务器
        public httpd() {
                http.createServer(this.api()).listen(setting.port, () => {
                        console.log(this.configures.name + ' running on port ' + setting.port)
                })
        }

        // 创建Master-Worker模式应用服务器之Master进程
        public master(rootPath: string) {
                let master = pm.createMaster({
                        pidfile: path.join(setting.pathTmpdir, this.configures.name + '.pid')
                })
                master.register(this.configures.name, path.join(rootPath, this.configures.name + '-worker.js'), {
                        listen: setting.masters,
                        addr: process.env.NODE_ENV === 'production' ? '127.0.0.1' : '0.0.0.0'
                })
                master.dispatch()
        }

        // 创建Master-Worker模式应用服务器之Worker脚本
        public worker() {
                let worker = http.createServer(this.api())
                pm.createWorker().ready((socket: any, port: any) => {
                        worker.emit('connection', socket)
                })
        }

        private api(): express.Express {
                let app = express()
                let configures = this.configures

                app.set('env', process.env.NODE_ENV || 'development')
                app.set('port', configures.port || setting.port)

                app.use(compression())
                app.use('/public', express.static(setting.pathPublic))
                app.use('/assets', express.static(setting.pathAssets))
                app.use(bodyParser.json({ limit: '50mb' }))
                app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
                app.use(cookieParser())

                //支持文件系统级日志消息
                let logdir = path.join(setting.pathTmpdir, configures.name || 'default')
                fs.existsSync(setting.pathTmpdir) || fs.mkdirSync(setting.pathTmpdir)
                fs.existsSync(logdir) || fs.mkdirSync(logdir)
                if (process.env.NODE_ENV !== 'production') {
                        console.log("use combined");
                        app.use(morgan('combined'))
                } else {
                        console.log("use log");
                        let options = {
                                stream: fileStreamRotator.getStream({
                                        date_format: 'YYYYMMDD',
                                        filename: path.join(logdir, configures.name + '-%DATE%.log'),
                                        frequency: 'daily',
                                        verbose: false
                                })
                        }

                        app.use(morgan('combined', options))
                }

                if (process.env.NODE_ENV !== 'production') {
                        app.use('/development', (req: express.Request, res: express.Response, next: any) => {
                                res.header('Content-Type', 'text/html;charset=utf-8')
                                res.end(dev.render({ pathinfo: req.path }))
                        })
                }

                app.use('/service/upload/imgUpload', multiparty(), (req: express.Request, res: express.Response, next: any) => {
                        // console.log("12333333333333333333333333");
                        upload(req, res, next).then((callback) => {
                                console.log(callback)
                                res.setHeader('Access-Control-Allow-Origin', '*')
                                res.setHeader('Access-Control-Allow-Methods', 'POST')
                                res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')

                                // res.renderJSON(callback)

                                res.header('charset', 'utf8')
                                res.header('Content-Type', 'application/json')
                                res.status(callback.code < 1000 ? callback.code : 200).end(JSON.stringify(callback))
                        })
                        // // app.use(/\/service/, multiparty(), (req: express.Request, res: express.Response, next: any) => {
                        // let controller = Object(configures.mappings)['/service' + req.path]
                        // console.log("controller::", controller);

                        // if (!controller) {
                        //         return new response(res).errorNotFound()
                        // }

                        // controller.component(req, res, next).then((callback: IResult) => {
                        //         console.log("com-then");

                        //         // res.setHeader('access-control-allow-credentials', 'true')
                        //         // res.setHeader('Access-Control-Allow-Origin', '*')
                        //         // res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE')
                        //         // res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')

                        //         console.log("------------------ do le ----------------------");
                        //         return new response(res).renderJSON(callback)
                        // }, (err: Error) => {
                        //         if (process.env.NODE_ENV === 'development') {
                        //                 console.log("eeeeeeeee", err)
                        //         }

                        //         return new response(res).errorInternalServer()
                        // })
                })

                app.use((req: express.Request, res: express.Response, next: any) => {
                        let requestData = new request(req)
                        let responseData = new response(res)

                        let accessToken = requestData.REQUEST('accessToken') || requestData.COOKIE('accessToken') || ''
                        let timezone = parseFloat(requestData.REQUEST('timezone', '8.0'))
                        let appID = requestData.REQUEST('appid')
                        let parameters = utils.jsonDecode(requestData.REQUEST('parameters'))
                        let controller = configures.mappings[req.path]

                        if (!controller || !controller.component) {
                                return responseData.apiNotFound()
                        }

                        if (/^\/api\//i.test(req.path) === false) {
                                return controller.component(requestData, responseData, parameters).then((callback: IResult) => {
                                        switch (callback.code) {
                                                case 403:
                                                        return responseData.errorPermission()

                                                case 404:
                                                        return responseData.errorNotFound()

                                                default:
                                                        return responseData.renderHTML(callback.data, callback.code)
                                        }
                                }, (err: Error) => {
                                        if (process.env.NODE_ENV !== 'production') {
                                                console.log(err)
                                        }

                                        responseData.errorInternalServer()
                                })
                        }

                        if (controller.method !== 'GET' && utils.empty(requestData.POST())) {
                                return responseData.apiPermission()
                        }

                        if (process.env.NODE_ENV !== 'development' && controller.auth) {
                                if (!utils.inContains(appid, appID) || !token.valid(accessToken, controller.auth)) {
                                        return responseData.apiPermission()
                                }
                        }

                        log.api(requestData)
                        controller.component(requestData, responseData, parameters).then((callback: IResult) => {
                                responseData.setHeader('Access-Control-Allow-Origin', '*')
                                responseData.setHeader('Access-Control-Allow-Methods', 'POST')
                                responseData.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')
                                responseData.renderJSON(callback)
                        }, (err: Error) => {
                                if (process.env.NODE_ENV !== 'production') {
                                        console.log(err)
                                }

                                responseData.apiInternalServer()
                        })
                })

                return app
        }
}
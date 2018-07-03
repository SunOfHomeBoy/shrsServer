// Copyright 2017 The Haohaoxiuche Team Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义前台页面服务器端接口 之 用户资源文件上传
//
// 参数说明：
//      {
//              // 此接口属于特殊的服务器端接口，其参数不作详解
//      }
//
// 返回数据：
//      {
//              "code": 200, // 返回代码：200表示成功，20x表示错误
//              "msg": "", // 错误消息：错误消息：若状态代码是200，则返回空字符串
//      }
//
// @authors hjboss <hongjiangproject@gmail.com> 2017-12 $$
import * as fs from 'fs'
import * as path from 'path'
import * as needle from 'needle'
import * as express from 'express'
import { IResult, render, utils } from '../../foundation'
import { setting, outside } from '../../config'

export default async function upload(req: express.Request, res: express.Response, next: any): Promise<IResult> {
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'POST')
        res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type')

        // console.log(Object(req).body);

        switch (req.method.toUpperCase()) {
                case 'OPTIONS':
                        return render({ code: 201, msg: '' })

                case 'POST':
                        return new Promise<any>(resolve => {
                                let fh: any = Object(req).files['photos']
                                // return resolve({code:200,msg:'SB'})

                                console.log('Object(req)::', Object(req).files['photos']);

                                // fs.readFile(fh.path, (err: Error, buffers: any) => { console.log(buffers); })
                                fs.readFile(fh.path, (err: Error, buffers: any) => {
                                        let targetName = new Buffer(utils.md5(String(buffers))).toString('base64').replace(/=/, '')
                                        let targetSuff = fh.name.split('.')[1]
                                        let targetFile = `${targetName}.${targetSuff}`
                                        let targetDist = path.join(setting.pathPublic, utils.formatDate('YYYYMM'), targetFile)
                                        let targetPath = path.dirname(targetDist)

                                        fs.existsSync(setting.pathPublic) || fs.mkdirSync(setting.pathPublic)
                                        fs.existsSync(targetPath) || fs.mkdirSync(targetPath)

                                        fs.writeFile(targetDist, buffers, (err: Error) => {
                                                if (err) {
                                                        return resolve({ code: 200, msg: err.message })
                                                }

                                                needle.post('http://up.imgapi.com/', {
                                                        file: {
                                                                file: targetDist,
                                                                content_type: fh.headers['content-type']
                                                        },
                                                        Token: outside.token,
                                                        aid: outside.aid,
                                                        deadline: Math.floor(Date.now() / 1000) + 60,
                                                        from: 'file',
                                                        httptype: 1
                                                }, { multipart: true }, (err: Error, callback: any) => {
                                                        if (err) {
                                                                return resolve({ code: 200, msg: err.message })
                                                        }

                                                        let result = utils.jsonDecode(callback.body || '')
                                                        if (err) {
                                                                return resolve({ code: 200, msg: result.info })
                                                        }

                                                        return resolve({ uri: result.linkurl, name: targetFile })
                                                })
                                        })
                                })
                        })
        }

        return render({ code: 200, msg: '' })
}
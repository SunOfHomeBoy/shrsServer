// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义核心业务数据模型 之 个人企业用户公共信息模型
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { ISchema, newSchema, schema, Mixed } from './schema'
import utils from '../utils'
import { business } from '../../config'
import video from '../vedio'
import vedio from '../vedio';

class schemaMember extends schema {
        protected init(): { name: string, schema: ISchema } {
                return {
                        name: 'member',
                        schema: newSchema({
                                _id: String,
                                openID: String,          // 用户OpenID字符串 非空 索引 格式：手机号码尾数 + UUID字符串
                                mobile: String,          // 用户注册手机号码（不包含国家代码） 非空 索引 纯数字字符串须正则检测
                                mobileArea: String,      // 用户注册手机号码的国家代码 非空 索引 默认值：86 即中国大陆区
                                password: String,        // 用户注册密码加密字符串 非空 算法：sha256( md5(未加密密码) + 给定随机字符串 )
                                passwordCode: String,    // 找回密码验证码 可空 默认值：空字符串
                                passwordPay: String,     // 用户支付密码 可空 默认值：空字符串
                                username: String,        // 用户账号 可空 默认值：第一份简历所填姓名 仅用于非正式场合显示
                                realname: String,        // 真实姓名 可空 默认值：第一份简历所填姓名 实名认证后不可修改
                                img: String,             // 用户头像 可空 默认值：第一份简历所填头像
                                sex: Number,             // 用户性别 可空 默认值：第一份简历所填性别 其中：0表示无效选项 1表示男性 2表示女性
                                phone: String,           // 用户座机电话 可空 默认值：空字符串
                                workYears: Number,       // 用户工作经验 可空 默认值：第一份简历所填工作经验 其中：<br> 1表示实习生 2表示应届毕业生 3表示一年或以上 4表示两年或以上 5表示三年或以上 <br> 6表示四年或以上 7表示五年或以上 8表示六年或以上 9表示8年或以上 10表示十年或以上
                                education: Number,       // 用户教育程度 可空 默认值：第一份简历所填教育程度 其中： <br> 1表示高中以下 2表示高中 3表示大专 4表示本科 5表示硕士 6表示博士
                                bodyHeight: Number,      // 用户身高 可空 默认值：0 单位：厘米
                                bodyWeight: Number,      // 用户体重 可空 默认值：0 单位： 公斤
                                nation: String,          // 用户民族 可空 默认值：空字符串
                                marry: Number,           // 婚姻状态 可空 默认值：0 其中：1表示未婚 2表示已婚
                                homepage: String,        // 个人主页 可空 默认值：空字符串
                                contactTencent: String,  // 联系方式：QQ 可空 默认值：空字符串
                                contactFacebook: String, // 联系方式：Facebook 可空 默认值：空字符串
                                contactWechat: String,   // 联系方式：微信号 可空 默认值：空字符串
                                contactQRCode: String,   // 联系方式：微信二维码 可空 默认值：空字符串
                                address: String,         // 详细地址 可空 默认值：空字符串
                                signature: String,       // 用户签名 可空 默认值：空字符串
                                introduce: String,       // 用户简介 可空 默认值：空字符串
                                birthdayYear: Number,    // 出生日年份 可空 默认值：0
                                birthdayMonth: Number,   // 出生日月份 可空 默认值：0 其中，01-12是值有效范围
                                birthdayDay: Number,     // 出生日日期 可空 默认值：0 其中，01-31是值有效范围
                                localeCountry: String,   // 现居所在地国家 可空 默认值：中国
                                localeProvince: String,  // 现居所在地省份 可空 默认值：第一份简历所填省份
                                localeCity: String,      // 现居所在地城市 可空 默认值：第一份简历所填城市
                                localeTown: String,      // 现居所在地镇县 可空 默认值：第一份简历所填镇县
                                homeCountry: String,     // 户籍所在地国家 可空 默认值：中国
                                homeProvince: String,    // 户籍所在地省份 可空 默认值：第一份简历所填省份
                                homeCity: String,        // 户籍所在地城市 可空 默认值：第一份简历所填城市
                                homeTown: String,        // 户籍所在地镇县 可空 默认值：第一份简历所填镇县
                                email: String,           // 用户电子邮箱 可空 默认值：第一份简历所填邮箱
                                emailCode: String,       // 邮箱认证验证码 可空 默认：空字符串
                                statusEmail: Boolean,    // 邮箱认证状态 可空 默认值：FALSE 其中：FALSe表示认证未通过 TRUE表示认证通过
                                idcardNumber: String,    // 用户身份证号码 可空 默认值：空字符串
                                idcardSex: Number,       // 用户身份证性别 可空 默认值：0 其中：0表示无效选项 1表示男性 2表示女性
                                idcardAddress: String,   // 用户身份证地址 可空 默认值：空字符串
                                statusIDCard: Boolean,   // 实名认证状态 可空 默认值：FALSE 其中：FALSE表示认证未通过 TRUE表示认证通过
                                rebate: String,          // 返利用户OpenID 可空 默认值：空字符串
                                rebateStatus: Boolean,   // 返利状态 可空 默认值：FALSE
                                money0: Number,          // 用户金额总数 可空 默认值：0 注意：所有金额计算皆以 分 作为基本单位
                                money1: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                money2: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                money3: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                money4: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                money5: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                money6: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                money7: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                money8: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                money9: Number,          // 用户某项金额（预留字段）可空 默认值：0 注意：同上
                                score0: Number,          // 注册用户免费查看次数 可空 默认值：0
                                score1: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                score2: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                score3: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                score4: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                score5: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                score6: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                score7: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                score8: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                score9: Number,          // 用户某项积分（预留字段）可空 默认值：0
                                role: Number,            // 用户类型 可空 默认值：0 其中：0表示普通个人及企业用户 1表示内部帐号 2表示内部推广帐号
                                grade: Number,           // 用户等级 可空 默认值：0
                                isEnterprise: Boolean,   // 是否企业用户 可空 默认值：FALSE 其中：FALSE表示个人用户 TRUE表示企业用户
                                signinTimes: Number,     // 用户连续签到天数 可空 默认值：0
                                signinDate: Date,        // 用户最近签到日期 可空 默认值：POSIX时间零值
                                signinAll: Number,       // 用户签到累计总数 可空 默认值：0
                                bandAlipay: String,      // 绑定支付宝OpenID 可空 默认值：空字符串
                                bandWechat: String,      // 绑定微信OpenID 可空 默认值：空字符串
                                bandTencent: String,     // 绑定QQ OpenID 可空 默认值：空字符串
                                bandWeibo: String,       // 绑定微博OpenID 可空 默认值：空字符串
                                bandFacebook: String,    // 绑定Facebook OpenID 可空 默认值：空字符串
                                bandTwitter: String,     // 绑定Twitter OpenID 可空 默认值：空字符串
                                bandGoogle: String,      // 绑定Google OpenID 可空 默认值：空字符串
                                bandWhatsApp: String,    // 绑定WhatsApp OpenID 可空 默认值：空字符串
                                bandVedio: Boolean,      // 绑定视频注册 可空 默认值：FALSE 其中：TRUE表示已经绑定 FALSE表示尚未绑定
                                registerFrom: String,    // 注册来源类型 可空 默认值：空字符串 其中：PC表示网站手机号码注册 MOBILE表示移动端手机号码注册 WECHAT表示微信第三方账号绑定 TENCENT表示腾讯QQ第三方账号绑定
                                registerCode: String,    // 邀请注册码 可空 默认值：空字符串
                                registerIP: String,      // 用户注册所在地IP 可空 默认值：空字符串
                                registerTime: Date,      // 用户注册时间 可空 默认值：POSIX时间零值
                                signinIP: String,        // 当前登录所在地IP 可空 默认值：空字符串
                                signinTime: Date,        // 当前登录时间 可空 默认值：POSIX时间零值
                                lastIP: String,          // 最近登录所在地IP 可空 默认值：空字符串
                                lastTime: Date,          // 最近登录时间 可空 默认值：POSIX时间零值
                                backgroundImg: String,   // 移动设备背景图片 可空 默认值：空字符串
                                deviceID: String,        // 移动设备号 可空 默认值：空字符串
                                location: {              // 实时地理坐标 可空 默认值：空数组
                                        type: Mixed,        //
                                        index: '2dsphere'   //
                                },
                                locationHome: {          // 居住地理坐标 可空 默认值：空数组
                                        type: Array,        //
                                        index: '2dsphere'   //
                                },
                                enable: Boolean          // 用户帐号是否有效 可空 默认值：TRUE 其中：TRUE表示帐号有效 FALSE表示帐号无效
                        })
                }
        }

        // 检测给定的手机号码及其区号是否已经被注册
        public async existsByMobile(mobile: string, mobileArea: string, enable: boolean = true): Promise<boolean> {
                return this.exists({ mobile, mobileArea, enable })
        }

        // 获取给定的手机号码及其区号的用户基本信息
        public async findOneByMobile(mobile: string, mobileArea: string, enable: boolean = true): Promise<any> {
                return this.findOne({
                        where: {
                                mobile, mobileArea, enable
                        }
                })
        }

        // 基于给定的基本信息注册用户信息
        public async New(parameters: any): Promise<any> {
                if (utils.empty(parameters.mobile) || utils.empty(parameters.password)) {
                        return new Promise<any>(resolve => resolve(false))
                }

                let document: any = {
                        openID: parameters.openID || utils.NewOpenID(parameters.mobile),
                        mobile: parameters.mobile,
                        mobileArea: parameters.mobileArea || '86',
                        password: utils.cryptoPassword(parameters.password),
                        username: parameters.username || parameters.nickname || '',
                        img: parameters.headerImg || '',
                        sex: parameters.sex || 0,
                        role: parameters.role || 0,
                        rebate: parameters.rebate || '',
                        isEnterprise: parameters.registerType === 'ENTERPRISE',
                        bandWechat: parameters.wechatID || '',
                        bandTencent: parameters.tencentID || '',

                        registerFrom: parameters.registerFrom || 'PC',
                        registerIP: parameters.registerIP || '127.0.0.1',
                        registerTime: new Date(),
                        signinIP: parameters.signinIP || '127.0.0.1',
                        signinTime: new Date(),
                        lastIP: parameters.lastIP || '127.0.0.1',
                        lastTime: new Date(),
                        backgroundImg: parameters.backgroundImg || '',
                        deviceID: parameters.deviceID || '',
                        enable: true
                }
                document._id = document.openID

                if (typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                        document.location = [parameters.locationX, parameters.locationY]

                        document.registerFrom = 'MOBILE'
                        if (document.bandTencent) {
                                document.registerFrom = 'TENCENT'
                        } else if (document.bandWechat) {
                                document.registerFrom = 'WECHAT'
                        }
                }

                if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                        document.locationHome = [parameters.locationHomeX, parameters.locationHomeY]
                }

                // 绑定视频注册
                document.bandVedio = await vedio.registerMember(document.openID)

                // 初始化核心业务数据
                let initBusiness = Object(business)
                document.money0 = initBusiness.initNum || 0
                document.score0 = initBusiness.freeNum || 0

                // 注册即自动签到数据
                document.signinTimes = 1
                document.signinDate = new Date()
                document.signinAll = 1

                let callback = await this.save(document)
                if (utils.empty(callback)) {
                        return new Promise<any>(resolve => resolve(false))
                }

                return new Promise<any>(resolve => resolve(document))
        }

        // 基于用户简历信息设置其相关数据项
        public async updateByResume(parameters: any, member: any): Promise<any> {
                let document: any = {}

                if (parameters.realname && parameters.realname !== member.realname) {
                        document.realname = parameters.realname
                }

                if (parameters.realname) {
                        document.username = parameters.realname
                }

                if (parameters.sex) {
                        document.sex = parameters.sex
                }

                if (typeof (parameters.img) === 'string' && parameters.img) {
                        document.img = parameters.img
                }

                if (parameters.mobile) {
                        document.mobile = parameters.mobile
                        document.mobileArea = parameters.mobileArea || '86'
                }

                if (parameters.birthday) {
                        let date = new Date(parameters.birthday)

                        document.birthdayYear = date.getFullYear()
                        document.birthdayMonth = date.getMonth() + 1
                        document.birthdayDay = date.getDate()
                }

                if (parameters.localeCountry && parameters.localeProvince && parameters.localeCity && parameters.localeTown) {
                        document.localeCountry = parameters.localeCountry
                        document.localeProvince = parameters.localeProvince
                        document.localeCity = parameters.localeCity
                        document.localeTown = parameters.localeTown
                }

                if (parameters.email) {
                        document.email = parameters.email
                        document.statusEmail = false
                }

                return this.findByIdAndUpdate(parameters.openID, document)
        }
}
export default new schemaMember()
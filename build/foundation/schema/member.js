"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var schema_1 = require("./schema");
var utils_1 = require("../utils");
var config_1 = require("../../config");
var vedio_1 = require("../vedio");
var schemaMember = (function (_super) {
    __extends(schemaMember, _super);
    function schemaMember() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    schemaMember.prototype.init = function () {
        return {
            name: 'member',
            schema: schema_1.newSchema({
                _id: String,
                openID: String,
                mobile: String,
                mobileArea: String,
                password: String,
                passwordCode: String,
                passwordPay: String,
                username: String,
                realname: String,
                img: String,
                sex: Number,
                phone: String,
                workYears: Number,
                education: Number,
                bodyHeight: Number,
                bodyWeight: Number,
                nation: String,
                marry: Number,
                homepage: String,
                contactTencent: String,
                contactFacebook: String,
                contactWechat: String,
                contactQRCode: String,
                address: String,
                signature: String,
                introduce: String,
                birthdayYear: Number,
                birthdayMonth: Number,
                birthdayDay: Number,
                localeCountry: String,
                localeProvince: String,
                localeCity: String,
                localeTown: String,
                homeCountry: String,
                homeProvince: String,
                homeCity: String,
                homeTown: String,
                email: String,
                emailCode: String,
                statusEmail: Boolean,
                idcardNumber: String,
                idcardSex: Number,
                idcardAddress: String,
                statusIDCard: Boolean,
                rebate: String,
                rebateStatus: Boolean,
                money0: Number,
                money1: Number,
                money2: Number,
                money3: Number,
                money4: Number,
                money5: Number,
                money6: Number,
                money7: Number,
                money8: Number,
                money9: Number,
                score0: Number,
                score1: Number,
                score2: Number,
                score3: Number,
                score4: Number,
                score5: Number,
                score6: Number,
                score7: Number,
                score8: Number,
                score9: Number,
                role: Number,
                grade: Number,
                isEnterprise: Boolean,
                signinTimes: Number,
                signinDate: Date,
                signinAll: Number,
                bandAlipay: String,
                bandWechat: String,
                bandTencent: String,
                bandWeibo: String,
                bandFacebook: String,
                bandTwitter: String,
                bandGoogle: String,
                bandWhatsApp: String,
                bandVedio: Boolean,
                registerFrom: String,
                registerCode: String,
                registerIP: String,
                registerTime: Date,
                signinIP: String,
                signinTime: Date,
                lastIP: String,
                lastTime: Date,
                backgroundImg: String,
                deviceID: String,
                location: {
                    type: schema_1.Mixed,
                    index: '2dsphere'
                },
                locationHome: {
                    type: Array,
                    index: '2dsphere'
                },
                enable: Boolean
            })
        };
    };
    schemaMember.prototype.existsByMobile = function (mobile, mobileArea, enable) {
        if (enable === void 0) { enable = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.exists({ mobile: mobile, mobileArea: mobileArea, enable: enable })];
            });
        });
    };
    schemaMember.prototype.findOneByMobile = function (mobile, mobileArea, enable) {
        if (enable === void 0) { enable = true; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2, this.findOne({
                        where: {
                            mobile: mobile, mobileArea: mobileArea, enable: enable
                        }
                    })];
            });
        });
    };
    schemaMember.prototype.New = function (parameters) {
        return __awaiter(this, void 0, void 0, function () {
            var document, _a, initBusiness, callback;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (utils_1["default"].empty(parameters.mobile) || utils_1["default"].empty(parameters.password)) {
                            return [2, new Promise(function (resolve) { return resolve(false); })];
                        }
                        document = {
                            openID: parameters.openID || utils_1["default"].NewOpenID(parameters.mobile),
                            mobile: parameters.mobile,
                            mobileArea: parameters.mobileArea || '86',
                            password: utils_1["default"].cryptoPassword(parameters.password),
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
                        };
                        document._id = document.openID;
                        if (typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                            document.location = [parameters.locationX, parameters.locationY];
                            document.registerFrom = 'MOBILE';
                            if (document.bandTencent) {
                                document.registerFrom = 'TENCENT';
                            }
                            else if (document.bandWechat) {
                                document.registerFrom = 'WECHAT';
                            }
                        }
                        if (typeof (parameters.locationHomeX) === 'number' && typeof (parameters.locationHomeY) === 'number') {
                            document.locationHome = [parameters.locationHomeX, parameters.locationHomeY];
                        }
                        _a = document;
                        return [4, vedio_1["default"].registerMember(document.openID)];
                    case 1:
                        _a.bandVedio = _b.sent();
                        initBusiness = Object(config_1.business);
                        document.money0 = initBusiness.initNum || 0;
                        document.score0 = initBusiness.freeNum || 0;
                        document.signinTimes = 1;
                        document.signinDate = new Date();
                        document.signinAll = 1;
                        return [4, this.save(document)];
                    case 2:
                        callback = _b.sent();
                        if (utils_1["default"].empty(callback)) {
                            return [2, new Promise(function (resolve) { return resolve(false); })];
                        }
                        return [2, new Promise(function (resolve) { return resolve(document); })];
                }
            });
        });
    };
    schemaMember.prototype.updateByResume = function (parameters, member) {
        return __awaiter(this, void 0, void 0, function () {
            var document, date;
            return __generator(this, function (_a) {
                document = {};
                if (parameters.realname && parameters.realname !== member.realname) {
                    document.realname = parameters.realname;
                }
                if (parameters.realname) {
                    document.username = parameters.realname;
                }
                if (parameters.sex) {
                    document.sex = parameters.sex;
                }
                if (typeof (parameters.img) === 'string' && parameters.img) {
                    document.img = parameters.img;
                }
                if (parameters.mobile) {
                    document.mobile = parameters.mobile;
                    document.mobileArea = parameters.mobileArea || '86';
                }
                if (parameters.birthday) {
                    date = new Date(parameters.birthday);
                    document.birthdayYear = date.getFullYear();
                    document.birthdayMonth = date.getMonth() + 1;
                    document.birthdayDay = date.getDate();
                }
                if (parameters.localeCountry && parameters.localeProvince && parameters.localeCity && parameters.localeTown) {
                    document.localeCountry = parameters.localeCountry;
                    document.localeProvince = parameters.localeProvince;
                    document.localeCity = parameters.localeCity;
                    document.localeTown = parameters.localeTown;
                }
                if (parameters.email) {
                    document.email = parameters.email;
                    document.statusEmail = false;
                }
                return [2, this.findByIdAndUpdate(parameters.openID, document)];
            });
        });
    };
    return schemaMember;
}(schema_1.schema));
exports["default"] = new schemaMember();

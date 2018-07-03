"use strict";
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
var fs = require("fs");
var path = require("path");
var needle = require("needle");
var foundation_1 = require("../../foundation");
var config_1 = require("../../config");
function upload(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', 'POST');
            res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
            switch (req.method.toUpperCase()) {
                case 'OPTIONS':
                    return [2, foundation_1.render({ code: 201, msg: '' })];
                case 'POST':
                    return [2, new Promise(function (resolve) {
                            var fh = Object(req).files['photos'];
                            return resolve({ code: 200, msg: 'SB' });
                            console.log('Object(req)::', Object(req).files['photos']);
                            fs.readFile(fh.path, function (err, buffers) {
                                var targetName = new Buffer(foundation_1.utils.md5(String(buffers))).toString('base64').replace(/=/, '');
                                var targetSuff = fh.name.split('.')[1];
                                var targetFile = targetName + "." + targetSuff;
                                var targetDist = path.join(config_1.setting.pathPublic, foundation_1.utils.formatDate('YYYYMM'), targetFile);
                                var targetPath = path.dirname(targetDist);
                                fs.existsSync(config_1.setting.pathPublic) || fs.mkdirSync(config_1.setting.pathPublic);
                                fs.existsSync(targetPath) || fs.mkdirSync(targetPath);
                                fs.writeFile(targetDist, buffers, function (err) {
                                    if (err) {
                                        return resolve({ code: 200, msg: err.message });
                                    }
                                    needle.post('http://up.imgapi.com/', {
                                        file: {
                                            file: targetDist,
                                            content_type: fh.headers['content-type']
                                        },
                                        Token: config_1.outside.token,
                                        aid: config_1.outside.aid,
                                        deadline: Math.floor(Date.now() / 1000) + 60,
                                        from: 'file',
                                        httptype: 1
                                    }, { multipart: true }, function (err, callback) {
                                        if (err) {
                                            return resolve({ code: 200, msg: err.message });
                                        }
                                        var result = foundation_1.utils.jsonDecode(callback.body || '');
                                        if (err) {
                                            return resolve({ code: 200, msg: result.info });
                                        }
                                        return resolve({ uri: result.linkurl, name: targetFile });
                                    });
                                });
                            });
                        })];
            }
            return [2, foundation_1.render({ code: 200, msg: '' })];
        });
    });
}
exports["default"] = upload;

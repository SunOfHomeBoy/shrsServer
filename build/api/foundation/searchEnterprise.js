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
var foundation_1 = require("../../foundation");
function searchEnterprise(req, res, parameters) {
    return __awaiter(this, void 0, void 0, function () {
        var filter, document;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    filter = {
                        where: {
                            $and: [
                                {
                                    enable: true
                                }
                            ]
                        },
                        begin: parameters.begin || 1,
                        limit: parameters.limit || 10
                    };
                    if (foundation_1.utils.empty(parameters.keyword) === false) {
                        filter.where.$and.push({
                            $or: [{
                                    name: {
                                        $regex: new RegExp(parameters.keyword, 'i')
                                    }
                                }, {
                                    recruit: {
                                        $elemMatch: {
                                            $regex: new RegExp(parameters.keyword, 'i')
                                        }
                                    }
                                }]
                        });
                    }
                    if (parameters.searchType === 'POSITION' && typeof (parameters.locationX) === 'number' && typeof (parameters.locationY) === 'number') {
                        filter.where.$and.push({
                            locationHome: {
                                $near: {
                                    $geometry: {
                                        type: "Point",
                                        coordinates: [parameters.locationX, parameters.locationY]
                                    }
                                }
                            }
                        });
                    }
                    else if (parameters.localeCountry && parameters.localeProvince && parameters.localeCity && parameters.localeTown) {
                        filter.where.$and.push({
                            localeCountry: parameters.localeCountry,
                            localeProvince: parameters.localeProvince,
                            localeCity: parameters.localeCity,
                            localeTown: parameters.localeTown
                        });
                    }
                    return [4, foundation_1.schema.enterprise.findPage(filter)];
                case 1:
                    document = _a.sent();
                    document.items = foundation_1.utils.forEach(document.items, function (e) {
                        return {
                            openID: foundation_1.utils.openIDEncode(e.openID),
                            enterpriseName: e.name || '',
                            enterpriseLogo: e.logo || '',
                            enterpriseAttr: e.attr || '',
                            enterprisePersons: e.persons || '',
                            enterpriseHomepage: e.homepage || '',
                            enterpriseAddress: e.address || '',
                            enterpriseIndustry: e.industry || [],
                            enterpriseRecruit: e.recruit || [],
                            enterpriseWelfare: e.wekfare || [],
                            localeCountry: e.localeCountry,
                            localeProvince: e.localeProvince,
                            localeCity: e.localeCity,
                            localeTown: e.localeTown,
                            locationHomeX: (e.locationHome || [])[0] || 0,
                            locationHomeY: (e.locationHome || [])[1] || 0,
                            distance: foundation_1.utils.gcDistance((e.locationHome || [])[0] || 0, (e.locationHome || [])[1] || 0, parameters.locationX, parameters.locationY) || 0
                        };
                    });
                    return [2, foundation_1.render({ code: 200, msg: '', data: document })];
            }
        });
    });
}
exports["default"] = searchEnterprise;

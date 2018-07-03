"use strict";
exports.__esModule = true;
var foundation_1 = require("../foundation");
var addArticle_1 = require("./article/addArticle");
var searchArticle_1 = require("./article/searchArticle");
var upload_1 = require("./imgUpload/upload");
exports["default"] = [
    {
        path: '/api/article/addArticle',
        component: addArticle_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/api/article/searchArticle',
        component: searchArticle_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/service/upload/imgUpload',
        component: upload_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS || foundation_1.purview.API_PURVIEW_COMMON || foundation_1.purview.API_PURVIEW_MEMBER
    },
    {
        path: '/service/service/upload',
        component: upload_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
    {
        path: '/service/service/upload111',
        component: upload_1["default"],
        auth: foundation_1.purview.API_PURVIEW_ADMINS
    },
];

// Copyright 2017 The HongJiang Project Authors. All right reserved.
// Use of this source that is governed by a Apache-style
// license that can be found in the LICENSE file.
//
// 定义服务器端接口路由及其权限
//
// @authors hjboss <hongjiangproject@gmail.com> 2018-01 $$
import { purview } from '../foundation'
// import banners from './service/banners'
import addArticle from './article/addArticle';
import searchArticle from './article/searchArticle';

import imgUpload from './imgUpload/upload'
import addImg from './imgUpload/addImg'
import addImgList from './imgUpload/addImgList'
import searchImg from './imgUpload/searchImg'
import searchImgList from './imgUpload/searchImgList'


export default [
        // 文章接口:
        {
                path: '/api/article/addArticle',
                component: addArticle,
                auth: purview.API_PURVIEW_ADMINS
        }, // 添加/编辑 文章
        {
                path: '/api/article/searchArticle',
                component: searchArticle,
                auth: purview.API_PURVIEW_ADMINS
        }, // 搜索 文章

        // 图片上传:
        {
                path: '/service/upload/imgUpload',
                component: imgUpload,
                auth: purview.API_PURVIEW_ADMINS || purview.API_PURVIEW_COMMON || purview.API_PURVIEW_MEMBER
        },
        {
                path: '/service/service/addImg',
                component: addImg,
                auth: purview.API_PURVIEW_ADMINS || purview.API_PURVIEW_COMMON || purview.API_PURVIEW_MEMBER
        },
        {
                path: '/service/service/addImgList',
                component: addImgList,
                auth: purview.API_PURVIEW_ADMINS || purview.API_PURVIEW_COMMON || purview.API_PURVIEW_MEMBER
        },

        // 用户收藏类接口


        // 管理账号类接口

        // 消息记录类接口

        // 图片广告类接口

        // 友好链接类接口

        // 行业设置类接口

        // 数据统计类接口
]
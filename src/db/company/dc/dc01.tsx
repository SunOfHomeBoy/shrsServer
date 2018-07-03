export default {
        "openID": "0d03b8d90-3c6e-1001-99a3-4fb0e0d70715", // 格式: "0d03b8d90-3c6e-XXXX-99a3-4fb0e0d70715" 其中：XXXX同手机尾数
        "mobile": "18500001001", // 格式："1850000XXYY" 其中：XX表示区号 10表示东城区 11表示西城区 12表示朝阳区 13表示海淀区 14表示昌平区 15表示大兴区 16表示房山区 17表示丰台区 18表示通州区 YY表示区内编号
        "enterpriseName": "北京东方广场有限公司", // 公司名称
        "enterpriseAttr": "外商独资", // 公司性质
        "enterpriseLogo": "http://i4.fuimg.com/611341/5447aedef5fb1fad.png", // 公司Logo图片 用公司名称作为图片文件名上传到Public目录
        "enterprisePersons": "500-999", // 公司规模 不允许存在空格和汉字
        "enterpriseIndustry": [
                "物业管理/商业中心" // 所属行业 不允许存在空格
        ],
        "enterpriseHomepage": "http://www.orientalplaza.com", // 公司网站
        "enterpriseAddress": "北京市东城区东长安街1号东方广场C2座12层", // 详细地址
        "locationHomeX": 116.421142, // 公司坐标X轴
        "locationHomeY": 39.91562, // 公司坐标Y轴
        "localeCountry": '中国',
        "localeProvince": '北京市',
        "localeCity": '北京市',
        "localeTown": '东城区',
        //公司介绍
        "enterpriseDescription": `
东方广场雄踞于北京市中心，坐落于东长安街1号之绝佳位置。东方广场占地约十万平方米，总建筑面积约80万平方米，是目前亚洲最大的商业建筑群之一，是真正的北京“城中之城”。
坐拥东长安街之绝佳地理位置，东方广场提供了各种完善的设施与服务，其东方经贸城拥有８幢甲级写字楼，云集了多家财富500强企业与各行业龙头公司在此；东方豪庭公寓拥有2幢豪华服务式公寓，为优雅、时尚与便利生活提供了保证。此外，五星级的北京东方君悦大酒店不仅拥有世界一流的酒店设施与服务，其充满热带风情的大型室内游泳池更是令人叹为观止。东方新天地商场面积逾13万平方米，拥有不同主题的购物区、四季常青的花坛、市中心最大的五彩音乐喷泉以及拥有1,900个停车位的室内停车场。
规模宏大、位置绝佳、前瞻性高科技设计与高效率的办公理念、加之顶尖的豪华居停与层出不穷的购物休闲乐趣，东方广场名符其实地成为了一个生活新焦点，商贸新纪元。
`,

        // 招聘信息
        "recruitments": [
                {
                        "workName": "客服专员--酒店式公寓", // 岗位名称
                        "money": 4, // 职位月薪 可空 默认值：0 其中：<br> 1表示1000元/月以下 2表示1000-2000元/月 3表示2000-4000元/月 <br> 4表示4000-6000元/月 5表示6000-8000元/月 6表示8000-10000元/月 <br> 7表示10000元-15000元/月 8表示15000-25000元/月 9表示25000-35000元/月 <br> 10表示35000-50000元/月 11表示50000-100000元/月 12表示100000元/月以上

                        // 福利待遇 可空 默认值：空数组
                        "welfare": [
                                "五险一金",
                                "带薪年假",
                                "定期体检",
                                "节日福利"
                        ],
                        // 岗位描述
                        "description": `
1.合理编排本区域入室保洁员工的班次并做好相应的签到签退等工作；
2.定时检查入室保洁员工的做房记录，以及登记工程维修记录等，以便开具工程维修单；
3.做好所辖公寓区域入室保洁员工钥匙签领、签退等手续；
4.负责检查所辖区域内各种设施、设备和各种装置的维护，发现隐患及时记录并进行报修；
`
                },
                {
                        "workName": "客房领班（酒店式公寓）",
                        "money": 4,
                        "welfare": [
                                "五险一金",
                                "带薪年假",
                                "定期体检",
                                "节日福利"
                        ],
                        "description": `
1.合理编排本区域入室保洁员工的班次并做好相应的签到签退等工作；
2.定时检查入室保洁员工的做房记录，以及登记工程维修记录等，以便开具工程维修单；
3.做好所辖公寓区域入室保洁员工钥匙签领、签退等手续；
4.负责检查所辖区域内各种设施、设备和各种装置的维护，发现隐患及时记录并进行报修
`
                },
                {
                        "workName": "助理客服主任--酒店式公寓（倒班制）",
                        "money": 4,
                        "welfare": [
                                "五险一金",
                                "带薪年假",
                                "定期体检",
                                "节日福利"
                        ],
                        "description": `
1.为入住公寓客人提供6星级的服务（解答客户咨询、处理客户投诉等）。
2.大专以上学历，年龄28岁以下；
3.具备1年以上涉外公寓或大型酒店前台接待或礼宾服务工作经验；
4.能用英语进行日常的沟通；
5.具有良好的服务意识及沟通能力；
`
                },
                {
                        "workName": "客房领班（酒店式公寓）",
                        "money": 4,
                        "welfare": [
                                "五险一金",
                                "带薪年假",
                                "定期体检",
                                "节日福利"
                        ],
                        "description": `
1.完成公寓客人的日常缴款工作；
2.解答客人对于财务账目方面的疑问；
3.协助客服人员进行查看相关客人的账目；
4.完成上级交办的其他工作。
5.熟悉操作财务及办公软件；
6.报表编制准确、及时；
7.账目清晰、准确，日清月结。
8.持会计上岗证
`
                }
        ]
}
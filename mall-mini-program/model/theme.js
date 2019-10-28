import {config} from "../config/config";

class Theme {
    static getLocationA() {
        wx.request({
            url: `${config.apiBaseUrl}theme/by/names`,
            method: 'GET',
            data: {
                names: 't-1'
            },
            header: {
                appkey: `${config.appKey}`
            },
            // 箭头函数保持this的指代不变
            success: res => {
                this.setData({
                    topTheme: res.data[0]
                })
            }
        })
    }
}
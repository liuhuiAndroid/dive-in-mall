import {Http} from "../utils/http";

class Banner{
    // 属性
    static locationB = 'b-1'
    static async getHomeLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }
}

export {
    Banner
}
/**
 * @作者 lh
 * @创建时间 2019/12/16 22:31
 */

import {Http} from "../utils/http";

class SaleExplain {

    static async getFixed() {
        const explains = await Http.request({
            url: `sale_explain/fixed`
        })
        return explains.map(e => {
            return e.text
        })
    }

}

export {
    SaleExplain
}
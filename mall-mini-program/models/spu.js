import {Http} from "../utils/http";

class Spu {
    static getDetail(id) {
        return Http.request({
            url: `spu/id/${id}/detail`
        });
    }

    /**
     * 是否是无规格的
     */
    static isNoSpec(spu) {
        if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
            return true
        } else {
            return false
        }
    }
}

export {
    Spu
}
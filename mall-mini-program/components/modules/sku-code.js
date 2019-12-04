/**
 * @作者 lh
 * @创建时间 2019/12/4 22:22
 */

import {combination} from "../../utils/util";

class SkuCode {

    code
    spuId
    // 当前SkuCode所有路径组合
    totalSegments = []

    constructor(code) {
        this.code = code
        this._splitToSegments()
    }

    /**
     * 拆解Code码
     * @private
     */
    _splitToSegments() {
        // 2$1-44#3-9#4-14
        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]
        const specCodeArray = spuAndSpec[1].split('#')
        // 组合算法
        const length = specCodeArray.length
        for (let i = 1; i <= length; i++) {
            const segments = combination(specCodeArray, i)
            console.log("segments:", segments)
            // 二维数组转一维数组
            const newSegments = segments.map(segs => {
                return segs.join('#')
            })
            console.log("newSegments:", newSegments)
            this.totalSegments = this.totalSegments.concat(newSegments)
        }
    }

}

export {
    SkuCode
}
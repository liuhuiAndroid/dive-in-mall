/**
 * @作者 lh
 * @创建时间 2019/12/4 22:14
 */
import {SkuCode} from "./sku-code";

// 折叠 ctrl + -

class Judger {

    fencesGroup
    // 字典
    pathDict = []

    constructor(fencesGroup) {
        this.fencesGroup = fencesGroup
        this.initPathDict()
    }

    /**
     * 初始化路径字典
     */
    initPathDict() {
        this.fencesGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
            console.log("pathDict:",this.pathDict)
        })
    }

}

export {
    Judger
}
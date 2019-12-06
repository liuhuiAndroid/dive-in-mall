import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu
    skuList = []
    fences = []

    constructor(spu) {
        this.spu = spu
        this.skuList = spu.sku_list
    }

    /**
     * 矩阵思维,逻辑稍微复杂一些，废弃
     * @deprecated
     */
    initFences() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        let currentJ = -1
        matrix.each((element, i, j) => {
            if (currentJ != j) {
                // 开启一个新列，需要创建一个新的Fence
                currentJ = j
                fences[currentJ] = this._createFence()
            }
            fences[currentJ].push(element)
        })
    }

    /**
     * 使用矩阵转置实现fences初始化
     */
    initFences2() {
        const matrix = this._createMatrix(this.skuList)
        const fences = []
        const AT = matrix.transpose()
        AT.forEach(r => {
            const fence = new Fence(r)
            fence.init()
            fences.push(fence)
        })
        this.fences = fences
        // console.log("fences:", fences)
    }

    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j]
                cb(cell, i, j)
            }
        }
    }

    _createFence() {
        const fence = new Fence()
        return fence
    }

    /**
     * 创建矩阵
     */
    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku => {
            m.push(sku.specs)
        })
        return new Matrix(m)
    }

}

export {
    FenceGroup
}
import {Cell} from "./cell";

/**
 * 规格
 */
class Fence {
    cells = []
    specs
    // 规格名的名字
    title
    // 规格名的id
    id

    constructor(specs) {
        this.specs = specs
        this.title = specs[0].key
        this.id = specs[0].key_id
    }

    init() {
        this._initCells()
    }

    _initCells() {
        this.specs.forEach(s => {
            // 去重，TODO 了解some和every
            const existed = this.cells.some(c => {
                return c.id === s.value_id
            })
            if (existed) {
                return
            }
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }

    setFenceSketch(skuList) {
        this.cells.forEach(cell => {
            this._setCellSkuImg(cell, skuList)
        })
    }

    _setCellSkuImg(cell, skuList) {
        const specCode = cell.getCellCode()
        const matchedSku = skuList.find(s => s.code.includes(specCode))
        if (matchedSku) {
            cell.skuImg = matchedSku.img
        }
    }
}

export {
    Fence
}
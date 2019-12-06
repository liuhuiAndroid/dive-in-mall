/**
 * @作者 lh
 * @创建时间 2019/12/4 22:14
 * 折叠 ctrl + -
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";

class Judger {

    fencesGroup
    // 字典
    pathDict = []

    constructor(fencesGroup) {
        this.fencesGroup = fencesGroup
        this._initPathDict()
    }

    /**
     * 初始化路径字典
     * @param this.fencesGroup.spu.sku_list 规格列表
     */
    _initPathDict() {
        console.log("sku_list:", this.fencesGroup.spu.sku_list)
        this.fencesGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
            console.log("pathDict:", this.pathDict)
        })
    }

    judge(cell) {
        this._changeCellStatus(cell)
    }

    _changeCellStatus(cell) {
        if (cell.status === CellStatus.WAITING) {
            cell.status = CellStatus.SELECTED
        } else if (cell.status === CellStatus.SELECTED) {
            cell.status = CellStatus.WAITING
        }

        this.fencesGroup.fences.forEach(f => {
            f.cells.forEach(c => {
                if (c.id === cell.id) {
                    c.status = cell.status
                }
            })
        })
    }

}

export {
    Judger
}
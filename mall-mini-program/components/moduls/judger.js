/**
 * @作者 lh
 * @创建时间 2019/12/4 22:14
 * 折叠 ctrl + -
 * 沟通类
 */
import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

class Judger {

    fencesGroup
    // 字典
    pathDict = []
    skuPending

    constructor(fencesGroup) {
        this.fencesGroup = fencesGroup
        this._initPathDict()
        this._initSkuPending()
    }

    isSkuIntact(){
        return this.skuPending.isIntact()
    }

    /**
     * 初始化默认SKU
     * @private
     */
    _initSkuPending() {
        const specsLength = this.fencesGroup.fences.length
        this.skuPending = new SkuPending(specsLength)
        const defaultSku = this.fencesGroup.getDefaultSku()
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku)
        console.log('skuPending:', this.skuPending)
        this._initSelectedCell()
        this.judge(null, null, null, true)
    }

    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fencesGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
        })
    }

    /**
     * 初始化路径字典
     * @param this.fencesGroup.spu.sku_list 规格列表
     */
    _initPathDict() {
        // console.log("sku_list:", this.fencesGroup.spu.sku_list)
        this.fencesGroup.spu.sku_list.forEach(s => {
            const skuCode = new SkuCode(s.code)
            this.pathDict = this.pathDict.concat(skuCode.totalSegments)
            // console.log("pathDict:", this.pathDict)
        })
    }

    judge(cell, x, y, isInit = false) {
        if (!isInit) {
            this._changeCurrentCellStatus(cell, x, y)
        }

        // 使用箭头函数，解决this指代问题
        this.fencesGroup.eachCell((cell, x, y) => {
            // 对于某个Cell，它的潜在路径应该是，它自己加上其他行的已选Cell
            const path = this._findPotentialPath(cell, x, y)
            if (!path) {
                return
            }
            console.log('path:', path)
            const isIn = this._isInDice(path)
            if (isIn) {
                this.fencesGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            } else {
                this.fencesGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN)
            }
        })
    }

    _isInDice(path) {
        return this.pathDict.includes(path)
    }

    /**
     * 查询潜在路径
     * @private
     */
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#')
        for (let i = 0; i < this.fencesGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i)
            if (x === i) {
                // 当前行,code为自己
                // if (cell.status == CellStatus.SELECTED) {
                if (this.skuPending.isSelected(cell, x)) {
                    return
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode)
            } else {
                // 其他行，code为其他行选中的code码
                if (selected) {
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode)
                }
            }
        }
        return joiner.getStr()
    }

    /**
     * @param spec.key_id
     * @param spec.value_id
     * @private
     */
    _getCellCode(spec) {
        return spec.key_id + '-' + spec.value_id
    }

    /**
     * 当前的Cell，不再需要判断潜在路径
     * @private
     */
    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fencesGroup.setCellStatusByXY(x, y, CellStatus.SELECTED)
            this.skuPending.insertCell(cell, x)
        } else if (cell.status === CellStatus.SELECTED) {
            this.fencesGroup.setCellStatusByXY(x, y, CellStatus.WAITING)
            this.skuPending.removeCell(x)
        }
    }

}

export {
    Judger
}
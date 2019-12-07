/**
 * @作者 lh
 * @创建时间 2019/12/6 23:58
 * 职责：记录已选择的规格值
 */
import {Cell} from "./cell";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    pending = []
    size

    constructor(size) {
        this.size = size
    }

    /**
     * @param sku 默认sku
     */
    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i])
            this.insertCell(cell, i)
        }
    }

    /**
     * 获取当前已选的规格值
     */
    getCurrentSpecValues() {
        const values = this.pending.map(cell => {
            return cell ? cell.spec.value : null
        })
        return values
    }

    /**
     * 获取未选的规格序号
     */
    getMissingSpecKeysIndex() {
        const keyIndex = []
        for (let i = 0; i < this.pending.length; i++) {
            if(!this.pending[i]){
                keyIndex.push(i)
            }
        }
        return keyIndex
    }

    getSkuCode() {
        const joiner = new Joiner('#')
        console.log('this.pending', this.pending)
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode()
            joiner.join(cellCode)
        })
        return joiner.getStr()
    }

    isIntact() {
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false
            }
        }
        return true
    }

    _isEmptyPart(index) {
        return this.pending[index] ? false : true
    }

    insertCell(cell, x) {
        this.pending[x] = cell
    }

    removeCell(x) {
        this.pending[x] = null
    }

    findSelectedCellByX(x) {
        return this.pending[x]
    }

    isSelected(cell, x) {
        const pendingCell = this.pending[x]
        if (!pendingCell) {
            return false
        }
        return cell.id === pendingCell.id
    }
}

export {
    SkuPending
}
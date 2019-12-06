/**
 * @作者 lh
 * @创建时间 2019/12/6 23:58
 * 职责：记录已选择的规格值
 */
class SkuPending {
    pending = []

    constructor() {

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
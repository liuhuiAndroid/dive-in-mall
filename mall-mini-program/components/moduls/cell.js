/**
 * 规格值
 */
import {CellStatus} from "../../core/enum";

class Cell{
    spec
    title
    id
    status = CellStatus.WAITING

    /**
     * @param spec.spec 规格
     * @param spec.value 规格值
     * @param spec.value_id 规格值
     */
    constructor(spec){
        this.spec = spec
        this.title = spec.value
        this.id = spec.value_id
    }

    getCellCode() {
        return this.spec.key_id + '-' + this.spec.value_id
    }
}

export {
    Cell
}
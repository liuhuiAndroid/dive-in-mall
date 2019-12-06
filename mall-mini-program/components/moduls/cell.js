/**
 * 规格值
 */
import {CellStatus} from "../../core/enum";

class Cell{
    title
    id
    status = CellStatus.WAITING

    /**
     * @param spec.value 规格值
     * @param spec.value_id 规格值
     */
    constructor(spec){
        this.title = spec.value
        this.id = spec.value_id
    }

}

export {
    Cell
}
import {Cell} from "./cell";

class Fence {
    cells = []
    specs

    constructor(specs) {
        this.specs = specs
    }

    init() {
        this.specs.forEach(s=>{
            const cell = new Cell(s)
            this.cells.push(cell)
        })
    }

}

export {
    Fence
}
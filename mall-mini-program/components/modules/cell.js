class Cell{
    title
    id

    /**
     *
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
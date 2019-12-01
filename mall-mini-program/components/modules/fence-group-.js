import {Matrix} from "./matrix";

class FenceGroup{
    spu
    skuList = []

    constuctor(spu){
        this.spu = spu
        this.skuList = spu.sku_list
    }

    initFences(){
       const matrix = this._createMatrix(this.skuList)
        matrix.forEach((element,i,j) => {
            
        })
    }

    /**
     * 创建矩阵
     */
    _createMatrix(skuList) {
        const m = []
        skuList.forEach(sku=>{
            m.push(sku.specs)
        })
        return new Matrix(m)
    }

}

export{
    FenceGroup
}
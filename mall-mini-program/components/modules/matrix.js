class Matrix {
    m

    constructor(matrix) {
        this.m = matrix
    }

    /**
     * 获取行数
     */
    get rowsNum() {
        return this.m.length
    }

    /**
     * 获取列数
     */
    get colsNum() {
        return this.m[0].length
    }

    /**
     * 生成器写法
     */
    each(cb) {
        // 遍历列
        for (let j = 0; j < this.colsNum; j++) {
            // 遍历行
            for (let i = 0; i < this.rowsNum; i++) {
                const element = this.m[i][j]
                cb(element, i, j)
            }
        }
    }

    /**
     * 模仿numpy对矩阵进行转置
     */
    transpose(){
        const desArr = []
        for (let j = 0; j < this.colsNum; j++) {
            desArr[j] = []
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j][i] = this.m[i][j]
            }
        }
        return desArr
    }

}

export {
    Matrix
}
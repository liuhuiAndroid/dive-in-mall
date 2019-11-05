import {Http} from "./http";

class Paging {
    // 不关心细节
    // 嗨，我需要下一页的数据了，你能给我吗

    start
    count
    req
    locker
    url
    moreData
    accumulator = []

    constructor(req, count = 10, start = 0) {
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
    }

    async getMoreData() {
        if (!this.moreData) {
            return
        }
        // 生成器思想 Generator
        // 数据锁
        if (!this._getLocker()) {
            return
        }
        const data = await this._actualGetData(this.req)
        this._releaseLocker()
        return data
    }

    // v1/spu/latest?start=0&count=10

    async _actualGetData() {
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if (!paging) {
            return null
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [], // 当前数据
                moreData: false,
                accumulator: [] // 累加数据
            }
        }
        this.moreData = Paging._moreData(paging.total_page, paging.page)
        if (this.moreData) {
            this.start += this.count
        }
        this._accumulate(paging.items)
        // 数据结构
        return {
            empty: false,
            items: paging.items, // 当前数据
            moreData: this.moreData,
            accumulator: this.accumulator // 累加数据
        }
    }

    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    _getCurrentReq() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if (url.indexOf('?') != -1) {
            url += '&' + params
        } else {
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    // 私有方法
    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    _releaseLocker() {
        this.locker = false
    }

}

export {
    Paging
}
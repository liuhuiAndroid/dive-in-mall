import {Http} from "./http";

/**
 * 作用：不关心细节。嗨，我需要下一页的数据了，你能给我吗
 * 以实例化的形式提供也调用方
 */
class Paging {

    req
    start
    count
    // 数据锁，默认没有锁住
    locker = false
    // 最原始的url
    url
    // 是否还有更多数据
    moreData = true
    // 累加数据
    accumulator = []

    /**
     * 初始化加载信息
     */
    constructor(req, start = 0, count = 10) {
        this.start = start
        this.count = count
        this.req = req
        this.url = req.url
    }

    /**
     * 获取数据，生成器思想 Generator
     */
    async getMoreData() {
        // 如果没有更多数据，直接返回
        if (!this.moreData) {
            return
        }
        if (!this._getLocker()) {
            return
        }
        const data = await this._actualGetData(this.req)
        this._releaseLocker()
        return data
    }

    /**
     * 真实发送请求，获取数据
     */
    async _actualGetData() {
        const req = this._getCurrentReq()
        let paging = await Http.request(req)
        if (!paging) {
            // 服务端出现问题
            return null
        }
        if (paging.total === 0) {
            // 重新组织数据结构，返回Object对象
            return {
                empty: true, // 是否为空
                items: [], // 当前数据
                moreData: false, // 是否还有下一页数据
                accumulator: [] // 累加数据
            }
        }
        this.moreData = Paging._moreData(paging.total_page, paging.page)
        if (this.moreData) {
            // 下一次start需要累加
            this.start += this.count
        }
        // 累加数据
        this._accumulate(paging.items)
        // 重新组织数据结构，返回Object对象
        return {
            empty: false, // 是否为空
            items: paging.items, // 当前数据
            moreData: this.moreData, // 是否还有下一页数据
            accumulator: this.accumulator // 累加数据
        }
    }

    /**
     * 累加数据
     */
    _accumulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    /**
     * 是否还有下一页数据
     */
    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1
    }

    /**
     * 获取当前的请求对象
     * 处理url,xxx?start=0&count=10
     */
    _getCurrentReq() {
        let url = this.url
        const params = `start=${this.start}&count=${this.count}`
        if (url.includes('?')) {
            url += '&' + params
        } else {
            url += '?' + params
        }
        this.req.url = url
        return this.req
    }

    /**
     * 私有方法,获取锁
     */
    _getLocker() {
        if (this.locker) {
            return false
        }
        this.locker = true
        return true
    }

    /**
     * 释放锁
     */
    _releaseLocker() {
        this.locker = false
    }

}

export {
    Paging
}
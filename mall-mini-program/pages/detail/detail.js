// pages/detail/detail.js
import {Spu} from "../../models/spu";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRealm: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        this.setData({
            spu
        })
    },

    onAddToCart(event) {
      this.setData({
        showRealm: true
      })
    },

    onBuy(event) {
      this.setData({
        showRealm: true
      })
    }
})
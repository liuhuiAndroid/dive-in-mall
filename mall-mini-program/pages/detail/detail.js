// pages/detail/detail.js
import {Spu} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRealm: false
    },

    /**
     * 生命周期函数--监听页面加载
     * @param options.pid 商品id
     */
    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        const explain = await SaleExplain.getFixed()
        this.setData({
            spu,
            explain
        })
        console.log("商品信息：", spu)
    },

    onGoToHome() {
        // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
        wx.switchTab({
            url: '/pages/home/home'
        })
    },

    onGoToCart() {
        // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
        wx.switchTab({
            url: '/pages/cart/cart'
        })
    },

    onAddToCart() {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        })
    },

    onBuy() {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
        })
    },

    onSpecChange(event) {
        this.setData({
            specs: event.detail
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }

})
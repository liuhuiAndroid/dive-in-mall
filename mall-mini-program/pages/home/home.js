// pages/home/home.js
import {config} from "../../config/config";
import {Theme} from "../../model/theme";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        topTheme: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const data = await Theme.getHomeLocationA()
        this.setData({
            topTheme: data[0]
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
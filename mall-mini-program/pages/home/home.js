// pages/home/home.js
import {Theme} from "../../model/theme";
import {Banner} from "../../model/banner";
import {Category} from "../../model/category";
import {Activity} from "../../model/activity";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null,
        grid: [],
        activityD: null,
        themeE: null,
        themeESpuList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.initAllData()
    },

    async initAllData() {
        const theme = new Theme()
        const themes = await theme.getThemes()
        // 保证调用过程简单
        const themeA = await theme.getHomeLocationA()
        const themeE = await theme.getHomeLocationE()
        let themeESpu = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpu = data.spu_list.slice(0, 8)
            }
        }
        const bannerB = await Banner.getHomeLocationB()
        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()
        this.setData({
            themeA,
            themeE,
            themeESpuList: themeESpu,
            bannerB,
            grid,
            activityD
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
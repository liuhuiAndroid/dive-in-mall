// pages/home/home.js
import {Theme} from "../../models/theme";
import {Banner} from "../../models/banner";
import {Category} from "../../models/category";
import {Activity} from "../../models/activity";
import {SpuPaging} from "../../models/spu-paging";

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
        themeESpuList: [],
        themeF: null,
        themeH: null,
        spuPaging: null,
        getThemeSpuByName: 'loading'
    },

    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging()
        this.data.spuPaging = paging
        const data = await paging.getMoreData()
        if (!data) {
            return
        }
        // 渲染数据，将数组传入瀑布流（瀑布流会自动累加数据）
        wx.lin.renderWaterFlow(data.items)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        this.initAllData()
        this.initBottomSpuList()
    },

    async initAllData() {
        const theme = new Theme()
        await theme.getThemes()
        // 保证调用过程简单
        const themeA = theme.getHomeLocationA()
        const themeE = theme.getHomeLocationE()
        const themeF = theme.getHomeLocationF()
        let themeESpuList = []
        if (themeE.online) {
            const data = await Theme.getHomeLocationESpu()
            if (data) {
                themeESpuList = data.spu_list.slice(0, 8)
            }
        }
        const bannerB = await Banner.getHomeLocationB()
        const grid = await Category.getHomeLocationC()
        const activityD = await Activity.getHomeLocationD()
        const bannerG = await Banner.getHomeLocationG()
        const themeH = theme.getHomeLocationH()
        this.setData({
            themeA,
            bannerB,
            grid,
            activityD,
            themeE,
            themeESpuList,
            themeF,
            bannerG,
            themeH
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
    onReachBottom: async function () {
        console.log('onReachBottom')
        const data = await this.data.spuPaging.getMoreData()
        if (!data) {
            return
        }
        wx.lin.renderWaterFlow(data.items)
        // 实现页底提示
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})
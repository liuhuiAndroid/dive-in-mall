// components/spu-preview/index.js
Component({
    /**
     * 组件的属性列表
     * properties是对外的属性
     */
    properties: {
        data: Object
    },

    /**
     * 组件的初始数据
     * data是内部数据
     */
    data: {
        tags: Array
    },

    /**
     * 监听器
     */
    observers: {
        // 监听data
        data: function (data) {
            if (!data) {
                return
            }
            if (!data.tags) {
                return
            }
            // 将tags字符串处理成数组
            const tags = data.tags.split('$')
            this.setData({
                tags
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onImageLoad(event) {
            const {width, height} = event.detail
            // console.log(width,height)
            this.setData({
                w: 340,
                h: 340 * height / width
            })
        },
        onItemTap(event){
            const pid = event.currentTarget.dataset.pid
            // 跳转页面，调用路由Api
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            })
            // 不适合放在组件中进行页面跳转，更适合在home中跳转

            // EventChannel
        }
    }
})

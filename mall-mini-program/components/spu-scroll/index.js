// components/spu-scroll/index.js
Component({

    externalClasses: ['l-class'],

    /**
     * 组件的属性列表
     */
    properties: {
        theme: Object,
        spuList: Array
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onItemTap(event) {
            // event.currentTarget返回的是绑定事件的元素
            const pid = event.currentTarget.dataset.pid
            // 跳转页面，调用路由Api
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            })
            // 不适合放在组件中进行页面跳转，更适合在home中跳转
            // EventChannel 待了解
        }
    }
})

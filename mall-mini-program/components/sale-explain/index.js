// components/sale-explain/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        texts: Array
    },

    /**
     * 组件的初始数据
     */
    data: {
        _texts: Array
    },

    observers: {
        'texts': function (texts) {
            this.setData({
                _texts: texts // 防止内存泄漏
            })
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {}
})

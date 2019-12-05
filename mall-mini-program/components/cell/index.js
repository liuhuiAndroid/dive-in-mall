// components/cell/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cell: Object
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        onTap(event) {
            // 触发自定义事件：子组件向父组件传参
            this.triggerEvent('celltap', {
                cell: this.properties.cell
            }, {
                bubbles: true, // 开启冒泡
                composed: true // 跨越组件边界
            })
        }
    }
})

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
        onTap() {
            // 触发事件：子组件向父组件传参
            this.triggerEvent('celltap', {
                cell: this.properties.cell
            }, {
                bubbles: true, // 事件是否冒泡
                composed: true // 事件是否可以穿越组件边界，为false时，事件将只能在引用组件的节点树上触发，不进入其他任何组件内部
            })
        }
    }
})

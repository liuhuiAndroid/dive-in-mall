import {FenceGroup} from "../moduls/fence-group";
import {Judger} from "../moduls/judger";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        judger: Object
    },

    /**
     * 监听器,处理数据
     */
    observers: {
        'spu': function (spu) {
            if (!spu) {
                return
            }
            const fencesGroup = new FenceGroup(spu)
            // fencesGroup.initFences()
            fencesGroup.initFences2()
            this.data.judger = new Judger(fencesGroup)
            this.bindInitData(fencesGroup)
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        },
        onCellTap(event) {
            const cell = event.detail.cell
            const x = event.detail.x
            const y = event.detail.y
            const judger = this.data.judger
            judger.judge(cell, x, y)
            this.setData({
                fences: judger.fencesGroup.fences
            })
            console.log('judger fences:', judger.fencesGroup.fences)
        }
    }
})

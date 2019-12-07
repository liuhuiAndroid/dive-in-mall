import {FenceGroup} from "../moduls/fence-group";
import {Judger} from "../moduls/judger";
import {Spu} from "../../models/spu";

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
        judger: Object,
        previewImg: String
    },

    /**
     * 监听器,处理数据
     */
    observers: {
        'spu': function (spu) {
            if (!spu) {
                return
            }
            if (Spu.isNoSpec(spu)) {
                this.processNoSpec(spu)
            } else {
                this.processHasSpec(spu)
            }
        }
    },

    /**
     * 组件的方法列表
     * @param spu.img
     * @param spu.discount_price
     */
    methods: {
        /**
         * 处理无规格
         */
        processNoSpec(spu) {
            this.setData({
                noSpec: true,
            })
            this.bindSkuData(spu.sku_list[0])
        },
        /**
         * 处理有规格
         */
        processHasSpec(spu) {
            const fencesGroup = new FenceGroup(spu)
            // fencesGroup.initFences()
            fencesGroup.initFences2()
            this.data.judger = new Judger(fencesGroup)
            const defaultSku = fencesGroup.getDefaultSku()
            if (defaultSku) {
                this.bindSkuData(defaultSku)
            } else {
                this.bindSpuData()
            }
            this.bindFenceGroupData(fencesGroup)
        },
        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price,
                skuIntact: this.data.judger.isSkuIntact() //SKU是否完整
            })
        },
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock,
                skuIntact: this.data.judger.isSkuIntact() //SKU是否完整
            })
        },
        bindFenceGroupData(fenceGroup) {
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

import {FenceGroup} from "../moduls/fence-group";
import {Judger} from "../moduls/judger";
import {Spu} from "../../models/spu";
import {Cell} from "../moduls/cell";
import {Cart} from "../../models/cart";

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object,
        orderWay: String
    },

    /**
     * 组件的初始数据
     */
    data: {
        judger: Object,
        previewImg: String,
        currentSkuCount: Cart.SKU_MIN_COUNT
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
            this.triggerSpecEvent()
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
            this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
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
                this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)
            } else {
                this.bindSpuData()
            }
            this.bindFenceGroupData(fencesGroup)
            this.bindTipData()
        },

        triggerSpecEvent() {
            const noSpec = Spu.isNoSpec(this.properties.spu)
            if (noSpec) {
                this.triggerEvent('specchange', {
                    noSpec: Spu.isNoSpec(this.properties.spu)
                })
            } else {
                this.triggerEvent('specchange', {
                    noSpec: Spu.isNoSpec(this.properties.spu),
                    skuIntact: this.data.judger.isSkuIntact(), //SKU是否完整
                    currentValues: this.data.judger.getCurrentSpecValues(),
                    missingKeys: this.data.judger.getMissingKeys()
                })
            }
        },

        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price
            })
        },

        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock
            })
        },

        bindTipData() {
            this.setData({
                skuIntact: this.data.judger.isSkuIntact(), //SKU是否完整
                currentValues: this.data.judger.getCurrentSpecValues(),
                missingKeys: this.data.judger.getMissingKeys()
            })
        },

        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        },

        onCellTap(event) {
            const data = event.detail.cell
            const x = event.detail.x
            const y = event.detail.y
            const cell = new Cell(data.spec)
            cell.status = data.status

            const judger = this.data.judger
            judger.judge(cell, x, y)
            this.bindFenceGroupData(judger.fencesGroup)

            const skuIntact = judger.isSkuIntact()
            if (skuIntact) {
                const currentSku = judger.getDeterminateSku()
                this.bindSkuData(currentSku)
                this.setStockStatus(currentSku.stock, this.data.currentSkuCount)
            }
            this.bindTipData()
            this.triggerSpecEvent()
        },

        onSelectCount(event) {
            const currentSkuCount = event.detail.count
            this.data.currentSkuCount = currentSkuCount

            if (this.data.judger.isSkuIntact()) {
                const currentSku = this.data.judger.getDeterminateSku()
                this.setStockStatus(currentSku.stock, currentSkuCount)
            }
        },

        setStockStatus(stock, currentCount) {
            this.setData({
                outStock: this.isOutOfStock(stock, currentCount)
            })
        },

        /**
         * 是否缺货
         */
        isOutOfStock(stock, currentCount) {
            return stock < currentCount
        }
    }
})

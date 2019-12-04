import {FenceGroup} from "../modules/fence-group";
import {Judger} from "../modules/judger";

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

  },

  /**
   * 监听器,处理数据
   */
  observers: {
    'spu': function (spu) {
      if(!spu){
        return
      }
      const fencesGroup = new FenceGroup(spu)
      // fencesGroup.initFences()
      fencesGroup.initFences2()
      const judger = new Judger(fencesGroup)
      this.bindInitData(fencesGroup)
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup){
      this.setData({
        fences: fenceGroup.fences
      })
    }
  }
})

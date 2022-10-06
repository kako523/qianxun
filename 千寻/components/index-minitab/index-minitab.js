// components/index-minitab/index-minitab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    minitabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    minitabs:[
      {
        id:0,
        name:"热门浏览",
        isActive:true
      },
      {
        id:1,
        name:"最新发布",
        isActive:false
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleItemTap(e){
      const {index}=e.currentTarget.dataset;
      this.triggerEvent("itemChange",{index});
    }
  }
})

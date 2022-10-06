// components/SearchInput/SearchInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
      input:'',
      // goods:[]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    SearchInput:function(e){
      this.setData({
        input:e.detail.value
      })
      this.triggerEvent("itemInput",{input});
    },
  
    //搜索按钮
    // handleSearch(){
    //   const {input}=this.data;
    //   if (!input.trim()){
    //     return ;
    //   }
    //   console.log(input);
    //   this.triggerEvent("itemInput",{input});
    //   //准备发送请求获取数据
    //   // this.qsearch(value);
    // },
  }
})

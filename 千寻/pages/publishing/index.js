// pages/publishing/index.js
import { request } from "../../request/index.js";
var app= getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notice: [
      { id: 0, name: '寻物' }, 
      { id: 1, name: '招领' }],
    points:[
      { id:1,  name:1},
      { id:2,  name:5},
      { id:3,  name:10},
      { id:4,  name:15},
      { id:5,  name:20}],
      goods:[
        {id:4,name:'宠物'},
        {id:5,name:'证件或卡'},
        {id:3,name:'数码设备'},
        {id:6,name:'化妆品'},
        {id:2,name:'衣物'},
        {id:7,name:'钥匙'},
        {id:1,name:'饰品'},
        {id:8,name:'文具'},
        {id:9,name:'其他'}
      ],

      showView: true,

      //被选中的图片路径数组
      chooseImgs:[],

      // 所有启事信息汇总
      tittle:'',
      content:'',
      latitude:'',
      longitude:'',
      ad_name:'',
      address:'',
      notice_type:0,
      points_num:0,
      kind:'',
      user_id:''

  },

  // 外网的图片路径数组
  UpLoadImgs:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.notice[0].checked = true;
    this.setData({
      notice: this.data.notice,
    })//默认parameter数组的第一个对象是选中的
  },

  parameterTap1:function(e){//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that=this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.notice//获取Json数组
    for (var i = 0; i < parameterList.length;i++){
      if (parameterList[i].id == this_checked){
        parameterList[i].checked = true;//当前点击的位置为true即选中
      }
      else{
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      notice: parameterList,
      notice_type:this_checked
    })
      //隐藏积分选项事件
    if (this_checked===2){
      that.setData({
        showView: false
      })
    }
    else {
      that.setData({
        showView: true
      })
    }
  },

  parameterTap2:function(e){//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that=this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.points//获取Json数组
    for (var i = 0; i < parameterList.length;i++){
      if (parameterList[i].id == this_checked){
        parameterList[i].checked = true;//当前点击的位置为true即选中
      }
      else{
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      points: parameterList,
      points_num: parameterList[this_checked-1].name
    })
  },

  parameterTap3:function(e){//e是获取e.currentTarget.dataset.id所以是必备的，跟前端的data-id获取的方式差不多
    var that=this
    var this_checked = e.currentTarget.dataset.id
    var parameterList = this.data.goods//获取Json数组
    for (var i = 0; i < parameterList.length;i++){
      if (parameterList[i].id == this_checked){
        parameterList[i].checked = true;//当前点击的位置为true即选中
      }
      else{
        parameterList[i].checked = false;//其他的位置为false
      }
    }
    that.setData({
      goods: parameterList,
      kind: this_checked
    })
  },

  //点击获取位置
  handleChooseAddress:function(){
    var that = this
    wx.chooseLocation({
      success: function (res) {
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude,
          ad_name: res.name,
          address: res.address
        })
        
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  tittleInput:function(e){
    this.setData({
      tittle:e.detail.value
    })
  },

  contentInput:function(e){
    this.setData({
      content:e.detail.value
    })
  },

  //选择图片事件
  handleChooseImg(){
    wx.chooseImage({
      count: 3,
      sizeType: ['original','compressed'],
      sourceType: ['album','camera'],
      success: (result)=>{
        this.setData({
          chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
        })
      }
    });
  },

  //移除图片
  handleRemoveImg(e){
    const {index}=e.currentTarget.dataset;
    let {chooseImgs}=this.data;
    chooseImgs.splice(index,1);
    this.setData({
      chooseImgs
    })
  },

  handleFormSubmit(){
    const {tittle,content,latitude,longitude,ad_name,address,notice_type,points_num,kind,chooseImgs}=this.data;
    if(!content.trim()||!tittle.trim()||!ad_name.trim()||kind===''||Object.keys(chooseImgs).length===0){
      wx.showToast({
        title: '请将信息输入完整',
        icon: 'none',
        mask: true
      });
      return;
    }

    chooseImgs.forEach((v,i) => {
      wx.uploadFile({
        url: 'https://img.coolcr.cn/api/upload',
        filePath: v,
        //名称跟后台约定好，后台从此获取文件
        name: "image",
        formData: {},
        success: (result)=>{
          let url=JSON.parse(result.data).data.url;
          this.UpLoadImgs.push(url);

          //所有图片上传完毕后
          if(i===chooseImgs.length-1){
            this.posnotice();
            //提交成功后，重置页面
            this.setData({
              tittle:'',
              content:'',
              latitude:'',
              longitude:'',
              ad_name:'',
              address:'',
              notice_type:0,
              points_num:0,
              kind:'',
              chooseImgs:[]
            })
            //返回上一个页面
            wx.navigateBack({
              delta: 1
            });
              
          }
        }
      });
    });
    //准备上传到专门图片服务器,无法同时上传多个文件，只能遍历数组挨个上传
  },

  //提交
  async posnotice(){
    this.setData({
      user_id:app.globalData.openId
    })
    const res=await request({url:"/find/add?category="+this.data.kind+"&userID="+this.data.user_id
  +"&title="+this.data.tittle+"&content="+this.data.content+"&score="+this.data.points_num
  +"&imageID="+this.UpLoadImgs+"&ad_name="+this.data.ad_name+"&address="+this.data.address
  +"&latitude="+this.data.latitude+"&longitude="+this.data.longitude+"&status="+this.data.notice_type});
    console.log(res.data);
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
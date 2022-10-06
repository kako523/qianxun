import { request } from "../../request/index.js";
var app= getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    image1:'',
    image2:'',
    image3:'',
    chooseImgs:[
      'https://z3.ax1x.com/2021/03/21/65z6AK.png'
    ],
    count:0,
    ad_name:'',
    address:'',
    content:'',
    score:0,
    notice_id:'',
    user_id:app.globalData.openId,
    pub_people:'',
    pub_img:''
  },

  showRule: function(){
    this.getMission();
    this.setData({
      isGrey:1,
      disabled:true
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取页面参数里的id
    this.setData({
        notice_id:options.id
      })
    console.log(this.data.notice_id);
    this.getNoticeDetail(this.data.notice_id);
    this.setData({
      user_id:app.globalData.openId
    })
  },

   //获取商品详情
   async getNoticeDetail(id){
     const res=await request({url:"/find/details?findID="+id});
     console.log(res.data);
     this.setData({
      content:res.data.content,
      score:res.data.score, 
      ad_name:res.data.ad_name,
      address:res.data.address,
      image1:res.data.image1,
      image2:res.data.image2,
      image3:res.data.image3,
      count:res.data.click,
      pub_people:res.data.nickname,
      pub_img:res.data.head_photo
     });
     if (this.data.score===null){
       this.setData({
         score:0
       })
     }
   },

   //领取任务
   async getMission( ){
     const res=await request({url:"/user/inserttask?user_id="+this.data.user_id+"&notice_id="+this.data.notice_id});
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
    var count_new=this.data.count+1
    this.setData({
      count:count_new
    })
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
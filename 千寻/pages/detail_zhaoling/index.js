import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    chooseImgs:[
      'https://s3.ax1x.com/2021/02/08/yUgEpd.jpg',
      'https://s3.ax1x.com/2021/02/08/yUgEpd.jpg'
    ],
    count:0,
    ad_name:'',
    address:'',
    content:'',
    notice_id:'',
    imageID:[]
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
  },

   //获取商品详情
   async getNoticeDetail(id){
     const res=await request({url:"/find/details?findID="+id});
     console.log(res.data);
     this.setData({
      content:res.data.content, 
      ad_name:res.data.ad_name,
      address:res.data.address,
      imageID:res.data.imageID
     })
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
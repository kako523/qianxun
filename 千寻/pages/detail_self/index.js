// pages/detail_self/index.js
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
    noticeObj:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取页面参数里的id
    // const (notice_id)=options;
    // console.log(notice_id);
    //this.getNoticeDetail(notice_id);
  },

  //获取商品详情
  async getNoticeDetail(notice_id){
    const noticeObj=await request({url:"",data:{notice_id}});
    console.log(noticeObj);
    this.setData({
      noticeObj
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
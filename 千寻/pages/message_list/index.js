// pages/message_list/index.js
import { request } from "../../request/index.js";
var app= getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList:[],
    user_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getMessage();
  },

  async getMessage(){
    this.setData({
      user_id:app.globalData.openId
    })
    const res=await request({url:"/user/message?openid="+this.data.user_id});
    console.log(res.data);
    this.setData({
      messageList:res.data
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const height = this.data.projectNum * 90 + 92    // 计算出页面高度
    wx.pageScrollTo({            
      scrollTop: height,         
      duration: 300              
    })   
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onPullDownRefresh();
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

  },
  onPullDownRefresh(){
    //重置数组
    this.setData({
      messageList:[]
    })
    //重新发送请求
    this.getMessage();
  }
})
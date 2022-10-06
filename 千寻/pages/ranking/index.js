// pages/ranking/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user_id:getApp().globalData.userInfo,
    rankList:[]
  },

   async getNoticeDetail(){
       const res=await request({url:"/user/phb",data:{}});
       console.log(res.data);
       this.setData({
        rankList:res.data
       })
     },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNoticeDetail();
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
  onShareAppMessage: function (res) {
    if (res.from === 'button'){
      console.log(res.target)
    }
    return {
      title: '我的名次',
      desc: '我在寻物小程序——千寻中取得了好多积分，快来看看吧',
      path: '/pages/ranking?id=123'
    }
  }
})
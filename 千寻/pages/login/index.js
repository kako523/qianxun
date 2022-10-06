// pages/login/index.js
import { request } from "../../request/index.js";
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    QueryParams:{
      code:"",
      nickName:"",
      avatarUrl:""
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了");
        } else {
          //用户没有授权
          console.log("用户没有授权");
        }
      }
    });
    that.login();
  },

  bindGetUserInfo: function(res) {
        if (res.detail.userInfo) {
          //用户按了允许授权按钮
          var that = this;
          // 获取到用户的信息了，打印到控制台上看下
          console.log("用户的信息如下：");
          console.log(res.detail.userInfo);
          that.setData({
            ['QueryParams.nickName']:res.detail.userInfo.nickName,
            ['QueryParams.avatarUrl']:res.detail.userInfo.avatarUrl,
          })
          that.getUser();
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          wx.navigateBack({
          delta: 1
    });
        } 
  },

  bindGetUserInfo_no:function(res){
    wx.showModal({
          title: '提示',
          content: '您点击了暂不授权，将无法使用小程序部分功能',
          showCancel: true,
          confirmText: '确定',
          cancelText:'返回授权',
          success: function(res) {
              if (res.confirm) {
                  console.log('用户点击了确定');
                  wx.navigateBack({
                    delta: 1
                  });
               }
              else if (res.cancel){
                console.log('用户点击返回授权');
              }
              }
            });
  },

  login(){
    var that=this;
    wx.login({
      success (res) {
        if (res.code) {
          console.log(res);
          that.setData({
            ['QueryParams.code']:res.code
          })
        } else {
          console.log('登录失败！' + res.errMsg)
    }
    }
    })
  },

  async getUser(){
    var that=this;
    console.log(that.data.QueryParams.code);
    const res=await request({url:'/user/login?code='+that.data.QueryParams.code+"&nickName="+
    that.data.QueryParams.nickName+"&avatarUrl="+that.data.QueryParams.avatarUrl});
     //openId赋值
    getApp().globalData.nickName=res.data.nickName;
    getApp().globalData.avatarUrl=res.data.avatarUrl;
    getApp().globalData.score=res.data.score;
    getApp().globalData.openId=res.data.openID;
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
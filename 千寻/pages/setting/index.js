// pages/setting/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:'',
    latitude:''
  },

  getUserInfo(){
    wx.getSetting({
            success: function(res) {
              if (res.authSetting['scope.userInfo']) {
                console.log("用户授权了");
                wx.openSetting({
                   success: (result)=>{
                   console.log(result)
                  },
                 });
              } 
              else {
                //用户没有授权
                console.log("用户没有授权");
                wx.navigateTo({
                  url: '/pages/login/index',
                  success: (result) => {
                    
                  },
                });
                  
              }
            }
          });
  },

  getlocation(){
    wx.openSetting({
      success: (result)=>{
      console.log(result)
     },
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
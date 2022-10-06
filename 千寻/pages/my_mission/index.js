// pages/my_mission/index.js
import { request } from "../../request/index.js";
var app= getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isGrey:0,
    disabled:false,
    user_id:'',
    missionList:[],
    task_id:'',
      // user_id:getApp().globalData.openId
      // pagenum:1,
      // pagesize:10
   //总页数
  //  totalPages:1,
  },

    //获取任务列表数据
    async getmissionList(){
      var that=this;
      const res=await request({url:'/user/alltask?user_id='+that.data.user_id});
      //获取总条数
      // const total=res.total;
      //计算总页数
      // this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
     //  console.log(this.totalPages);
      that.setData({
        //拼接数组
        missionList:res.data,
      })
      console.log(res.data);
      //关闭下拉刷新窗口
      wx.stopPullDownRefresh();
        
    },

    //我已找到
    async haveFound(){
      var that=this;
      const res=await request({url:"/user/findlost?task_id="+that.data.task_id});
      // this.setData({
      //   isGrey:res,
      //   disabled:true
      // })
      that.onPullDownRefresh();
    },

    //取消任务
    async deleteMission(){
      const res=await request({url:"/user/canceltask?task_id="+this.data.task_id});
      console.log(res);
    },

  handleItemRemove(e){
    var that=this;
    console.log( e.currentTarget.dataset.id);
    that.setData({
      task_id:e.currentTarget.dataset.id
    })
    that.deleteMission();
    that.onPullDownRefresh();
  },

//点击变灰事件
  showRule: function(e){
    var that=this;
    console.log( e.currentTarget.dataset.id);
    that.setData({
      task_id:e.currentTarget.dataset.id
    })
    that.haveFound();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user_id:app.globalData.openId
    })
    this.getmissionList();
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

  },
  //滚动条触底,加载下一页
  /*onReachBottom(){
    // console.log("页面触底")
    //判断还有没有下一行数据
    if (this.QueryParams.pagenum>=this.totalPages){
      //没有下一页数据
      // console.log("没有下一页");
      wx.showToast({
        title: '没有下一页了',
      });
    }
    else{
      //console.log("有下一页");
      this.QueryParams.pagenum++;
      this.getmissionList();
    }
  },*/
    //下拉刷新事件
    onPullDownRefresh(){
      //重置数组
      this.setData({
        missionList:[]
      })
      //重新发送请求
      this.getmissionList();
    }
})
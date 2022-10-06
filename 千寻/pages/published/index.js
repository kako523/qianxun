// pages/published/index.js
import { request } from "../../request/index.js";
var app= getApp();


Page({

  data: {
    disabled:false,
    minitabs:[
      {
        id:0,
        name:"寻物启事",
        isActive:true
      },
      {
        id:1,
        name:"招领启事",
        isActive:false
      }
    ],
    missionList:[],
    people:[],
    names:[],
    ids:[],
    score:'',
    user_id:'',
    findID:'',
    QueryParams:{
      //mission_id:'',
      // user_id:getApp().globalData.userInfo.###
      //pagenum:1,
      //pagesize:10
    },
   //总页数
   //totalPages:1,
  },
  onLoad: function (options) {
    this.setData({
      user_id:app.globalData.openId
    })
    this.getmissionList();
  },

  handleItemChange(e){
    //接收参数
    const {index}=e.detail;
    let {minitabs}=this.data;
    minitabs.forEach((v,i) => i===index?v.isActive=true:v.isActive=false);
    this.setData({
     minitabs
   })
},

  //获取任务列表数据
  async getmissionList(){
    const res=await request({url:"/find/getFindListByUser?userID="+this.data.user_id});
    //获取总条数
    // const total=res.total;
    //计算总页数
    // this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
   //  console.log(this.totalPages);
    this.setData({
      //拼接数组
      missionList:res.data
    })
    console.log(res.data);
    //关闭下拉刷新窗口
    wx.stopPullDownRefresh();
      
  },

  //确认完成
  async haveComplete(){
    var that=this;
    const res=await request({url:"/user/finish?notice_id="+that.data.findID});
    that.setData({
        people:res.data,
        names:[],
        ids:[]
        // isGrey:res,
      })
      for (let i=0;i<that.data.people.length;i++){
        that.data.names.push(that.data.people[i].nickName);
        that.data.ids.push(that.data.people[i].openID);
      }
    console.log(that.data.people);
    wx.showActionSheet({
      itemList: that.data.names,
      itemColor: '#000000',
      success: (result)=>{
        console.log(result.tapIndex)
        that.whocomplete(that.data.ids[result.tapIndex]);
      }
    });
  },

  //删除任务
  async deleteMission(){
    const res=await request({url:"/find/delete?findID="+this.data.findID});
    console.log(res.data);
  },

  //点击删除事件
   handleItemRemove(e){
    var that=this;
    that.setData({
      findID:e.currentTarget.dataset.id
    })
    that.deleteMission();
    that.onPullDownRefresh();
   },

  //确认任务完成者
  async whocomplete(people_id){
    const res=await request({url:"/user/finish/getscore?openId="+people_id
  +"&noticeid="+this.data.findID+"&score="+this.data.score});
    console.log(res.data);
  },

//点击变灰事件（确认完成者后）
  show:function(e){
    var that=this;
    that.setData({
      findID:e.currentTarget.dataset.id,
      score:e.currentTarget.dataset.score
    })
    that.haveComplete();
    that.onPullDownRefresh();
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
  /*
  onReachBottom(){
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
    this.missionList();
  }
},*/
  //下拉刷新事件
  onPullDownRefresh(){
    //重置数组
    this.setData({
     missionList:[]
    })
    //重置页码
    //this.QueryParams.pagenum=1;
    //重新发送请求
    this.getmissionList();
  }
})
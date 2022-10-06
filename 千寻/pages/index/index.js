//Page Object
import { request } from "../../request/index.js";
var app= getApp();

Page({
  data: {
    lunboData:[
        '../../image/qianxun.png'
    ],
    minitabs:[
      {
        id:0,
        name:"热门浏览",
        isActive:true
      },
      {
        id:1,
        name:"最新发布",
        isActive:false
      }
    ],
    keyword:'',
    // totalPages:1,
    hotnotices:[],
    newnotices:[]
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

SearchInput:function(e){
  this.setData({
    keyword:e.detail.value
  })
},

//搜索按钮
handleSearch(){
  var app=getApp();
  const {keyword}=this.data;
  if (!keyword.trim()){
    return ;
  }
  console.log(keyword);
  getApp().globalData.input=keyword;
  wx.switchTab({
    url: '/pages/all_Notice/index',
    success: (result) => {
      
    }
  });
},

async hotNotice(){
  const res=await request({url:"/find/list_click",data:this.QueryParams});
  this.setData({
      hotnotices:res.data
    })
},

async newNotice(){
  const res=await request({url:"/find/list_time",data:this.QueryParams});
  this.setData({
      newnotices:res.data
    })
},
  
  onLoad: function(options) {
    var that = this;
    //查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("用户授权了");
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
that.newNotice();
that.hotNotice();
  },

  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  
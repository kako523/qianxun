// pages/all_Notice/index.js
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 下拉框数据
    options_city: [{
      "id": "00",
      "text": "全部区域"
    }, {
      "id": "01",
      "text": "黄浦区"
    }, {
      "id": "02",
      "text": "徐汇区"
    },{
      "id": "03",
      "text": "静安区"
    },{
      "id": "04",
      "text": "普陀区"
    },
    {
      "id": "05",
      "text": "虹口区"
    },
    {
      "id": "06",
      "text": "杨浦区"
    },
    {
      "id": "07",
      "text": "浦东新区"
    },
    {
      "id": "08",
      "text": "闵行区"
    },
    {
      "id": "09",
      "text": "宝山区"
    },
    {
      "id": "10",
      "text": "嘉定区"
    },{
      "id": "11",
      "text": "金山区"
    },{
      "id": "12",
      "text": "松江区"
    },{
      "id": "13",
      "text": "青浦区"
    },{
      "id": "14",
      "text": "奉贤区"
    },{
      "id": "15",
      "text": "崇明区"
    }
  ],

    options_kind: [{
      "id": "00",
      "text": "全部物品"
    }, {
      "id": "01",
      "text": "饰品"
    }, {
      "id": "02",
      "text": "衣物"
    },{
      "id": "03",
      "text": "数码设备"
    },{
      "id": "04",
      "text": "宠物"
    },{
      "id": "05",
      "text": "证件或卡"
    },{
      "id": "06",
      "text": "化妆品"
    },{
      "id": "07",
      "text": "钥匙"
    },{
      "id": "08",
      "text": "文具"
    },{
      "id": "09",
      "text": "其他"
    }
  ],

    options_notice: [{    
      "id": "00",    
      "text": "寻物启事"},
      {
        "id": "01",    
      "text": "招领启事"
      }  
      ],
    //切换标签栏数据
    QueryParams:{
      status:0,
      keyword:'',
      categoryId:0,
      address:'',
      // pageNum:1,
      // pageSize:10
    },
    notices:[],
    // totalPages:1,
    
  },

// 下拉框
get_kindData:function(e){
  console.log(e.detail);
  this.setData({
    ['QueryParams.categoryId']:e.detail.id
  })
  this.qsearch();
},

 get_noticeData:function(e){
   console.log(e.detail);
   this.setData({
     ['QueryParams.status']:e.detail.id
   })
   this.qsearch();
 },

get_adData:function(e){
  var that=this;
  console.log(e.detail);
  that.setData({
     ['QueryParams.address']:e.detail.text
   })
   if (that.data.QueryParams.address==='全部区域'){
    that.setData({
      ['QueryParams.address']:''
    })
  }
   that.qsearch();
},

close_notice () {
  // 关闭select
  this.selectComponent('#select_notice').close()
},
close_kind () {
  // 关闭select
  this.selectComponent('#select_kind').close()
},
close_city () {
  // 关闭select
  this.selectComponent('#select_city').close()
},

SearchInput:function(e){
  this.setData({
    ['QueryParams.keyword']:e.detail.value
  })
},

//搜索按钮
handleSearch(){
  var text=this.data.QueryParams.keyword;
  if (!text.trim()){
    return ;
  }
  console.log(text);
  //准备发送请求获取数据
  this.qsearch();
},

 async qsearch(){
   const res=await request({url:"/find/list_select?title="+this.data.QueryParams.keyword+"&category="+this.data.QueryParams.categoryId
  +"&status="+this.data.QueryParams.status+"&area="+this.data.QueryParams.address});
  //  const total=res.total;
     //计算总页数
  //  this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    //  console.log(this.totalPages);
   this.setData({
       //拼接数组
       notices:res.data
     })
     //关闭下拉刷新窗口
    //wx.stopPullDownRefresh();
 },

publishtap( ){
  wx.getSetting({
          success: function(res) {
            if (res.authSetting['scope.userInfo']) {
              console.log("用户授权了");
              wx.navigateTo({
                url: '/pages/publishing/index',
              });
                
            } 
            else {
              //用户没有授权
              console.log("用户没有授权");
              wx.navigateTo({
                url: '/pages/login/index',
              });
                
            }
          }
        });
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app=getApp();
    this.setData({
      ['QueryParams.keyword']:app.globalData.input
    })
    this.qsearch();
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
      this.qsearch();
    }
  },*/
    //下拉刷新事件
    onPullDownRefresh(){
      //重置数组
      this.setData({
        notices:[]
      })
      //重置页码
      //this.QueryParams.pagenum=1;
      //重新发送请求
      this.qsearch();
    }
})
// pages/map/index.js
import { request } from "../../request/index.js";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude:121.475186,
    latitude:31.228725,
    markers: [],
    type:[
      '饰品',
      '衣物',
      '数码设备',
      '宠物',
      '证件或卡',
      '化妆品',
      '钥匙',
      '文具',
      '其他'
    ],
  //接口要的参数
  QueryParams:{
    query:"",
    cid:5,
    pagenum:1,
    pagesize:10
  },
  goodsList:[],
  score:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let vm=this;
    wx.getSetting({
      success: (result) => {
        console.log(JSON.stringify(result))
        if (result.authSetting['scope.userLocation'] != undefined && result.authSetting['scope.userLocation'] != true){
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            showCancel: true,
            cancelText: '取消',
            cancelColor: '#000000',
            confirmText: '确定',
            confirmColor: '#3CC51F',
            success: (result) => {
              if (result.confirm) {
                vm.getLocation();
              }
            },
          });
            
        }
      },
    });
    vm.getLocation()
    this.mapCtx = wx.createMapContext('mapId')

    this.mapCtx.on('markerClusterClick', res =>{
      console.log('markerClusterClick', res)
    })

    this.getGoodsList();
    this.setData({
      score:app.globalData.score
    })
    // 使用默认聚合效果时可注释下一句
    this.bindEvent()
      
  },

  //获取物品列表数据
  async getGoodsList(){
    var that=this,temp_markers=[],current={};
    const res=await request({url:"/find/list"});
    let a=[],i;
    a=res.data;
    for (i=0;i<res.data.length;i++){
      console.log(a[i].image1)
      var icon = "markers[" + i + "].iconPath";
      current={
          id:a[i].findID,
          latitude:a[i].latitude,
          longitude:a[i].longitude,
          width:40,
          height:40,
          alpha:1,
          joinCluster:true,
          label: {
            content: that.data.type[a[i].category-1],
            color: "#000000",
            fontSize: 15,
            textAlign:'center'
      }
      }
      temp_markers.push(current);
      that.setData({
        markers:temp_markers,
        [icon]:a[i].image1
      })
    }
  },

  getLocation:function(){
    var that = this
    wx.getLocation({
    type: 'wgs84',
    success: (result)=>{
    that.setData({
        latitude: result.latitude,
        longitude: result.longitude,
             
        })
    }
  });
  },

  bindmarkertap(e){
      console.log(e.detail.markerId);
      var iid=e.detail.markerId;
    // this.data.markers.forEach((item)=>{
    //   if (item.id == e.markerId){
      wx.navigateTo({
        url:"/pages/detail/index?id="+iid,
        success: (result) => {
          
        },
        fail: () => {},
        complete: () => {}
      });
        
      // }
      // })
  },


  bindEvent() {
    this.mapCtx.initMarkerCluster({
      enableDefaultStyle: false,
      zoomOnClick: true,
      gridSize: 60,
      complete(res) {
        console.log('initMarkerCluster', res)
      }
    })

    // enableDefaultStyle 为 true 时不会触发改事件
    this.mapCtx.on('markerClusterCreate', res => {
      console.log('clusterCreate', res)
      const clusters = res.clusters
      const markers = clusters.map(cluster => {
        const {
          center,
          clusterId,
          markerIds
        } = cluster
        return  {
          ...center,
          width: 0,
          height: 0,
          clusterId, // 必须
          label: {
            content: markerIds.length + '',
            fontSize: 20,
            width: 55,
            height: 55,
            color:'#ffffff',
            bgColor: '#F4A460',
            borderRadius: 30,
            textAlign: 'center',
            anchorX: 0,
            anchorY: -30,
          }
        }
      })
      this.mapCtx.addMarkers({
        markers,
        clear: false,
        complete(res) {
          console.log('clusterCreate addMarkers', res)
        }
      })
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
    this.getLocation();
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
})
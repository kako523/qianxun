import * as echarts from '../../ec-canvas/echarts';
import geoJson from './shanghai.js';
import { request } from "../../request/index.js";

var mapDate = [];
var category=[];
var nameList = [];
var valueList = [];
let scatterChart,barChart;


Page({
  data: {
    area:[],
    ecBar: {
       onInit: function (canvas, width, height, dpr) {
         barChart = echarts.init(canvas, null, {
           width: width,
           height: height,
           devicePixelRatio: dpr // new
        });
         canvas.setChart(barChart);
         return barChart;
       }
     },

    ecScatter: {
      onInit: function (canvas, width, height, dpr) {
        scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });

        echarts.registerMap('shanghai', geoJson);
        canvas.setChart(scatterChart);
        return scatterChart;
      }
    }
  },

  onLoad: function (options) {
    this.getArea();
  },

  async getArea( ){
    var that=this;
    const res1=await request({url:"/find/total_area"});
    const res2=await request({url:"/find/total_catogory"});
    that.setData({
      area:res1.data
    })
    category=res2.data;
    that.getMapData();
    scatterChart.setOption(getScatterOption());
    barChart.setOption(getBarOption());
  },

  onReady() {
  },
  onShow: function() {
  },
  getMapData: function() {
    var that=this;
      mapDate = [{name: '崇明县',value: that.data.area[15].count},
      {name: '宝山区',value: that.data.area[9].count},
      {name: '嘉定区',value: that.data.area[10].count},
      {name: '青浦区',value: that.data.area[13].count},
      {name: '杨浦区',value: that.data.area[6].count},
      {name: '虹口区',value: that.data.area[5].count},
      {name: '普陀区',value: that.data.area[4].count},
      {name: '静安区',value: that.data.area[3].count},
      {name: '黄浦区',value:that.data.area[0].count},
      {name: '长宁区',value: that.data.area[2].count},
      {name: '徐汇区',value: that.data.area[1].count},
      {name: '浦东新区',value: that.data.area[7].count},
      {name: '松江区',value:that.data.area[12].count},
      {name: '闵行区',value: that.data.area[8].count},
      {name: '金山区',value: that.data.area[11].count},
      {name: '奉贤区',value: that.data.area[14].count},

      ];
      var name = [];
      var value = [];
      for (var i = 0; i < mapDate.length; i++) {
        name[i] = mapDate[i].name;
        value[i] = mapDate[i].value;
      }
      nameList = name;
      valueList = value;
  
    }
});


function getBarOption() {
  return {
    title: {
      text: '种类分析'
    },
    dataset: {
      source: [
          ['amount', 'product'],
          [category[8], '其他'],
          [category[7], '文具'],
          [category[0], '饰品'],
          [category[6], '钥匙'],
          [category[1], '衣物'],
          [category[5], '化妆品'],
          [category[2], '数码设备'],
          [category[4], '证件或卡'],
          [category[3], '宠物']
      ]
  },
  // grid: {containLabel: true},
  grid:{
    left:60,
    top:50,
    bottom:50
  },
  xAxis: {name: ''},
  yAxis: {type: 'category'},
  series: [
      {
          type: 'bar',
          encode: {
              // Map the "amount" column to X axis.
              x: 'amount',
              // Map the "product" column to Y axis
              y: 'product'
          },
          label: {
            show: true,
            position: 'inside'
        },
        itemStyle:{
          normal:{
              color:'#66CDAA'
          }
      }
      }
  ]
  };
}

function getScatterOption() {
  return {
    title: {
      text: '数量分析'
    },
    grid:{
      left:60,
      top:50,
      bottom:30
    },
    tooltip: {
      trigger: 'item',
      backgroundColor: "#FFF",
      padding: [
        10, // 上
        15, // 右
        8, // 下
        15, // 左
      ],
      extraCssText: 'box-shadow: 2px 2px 10px rgba(21, 126, 245, 0.35);',
      textStyle: {
        fontFamily: "'Microsoft YaHei', Arial, 'Avenir', Helvetica, sans-serif",
        color: '#005dff',
        fontSize: 12,
      },
      formatter: `{b} :  {c}个`
    },
    geo: [{
      // 地理坐标系组件
      map: "上海",
      roam: false, // 可以缩放和平移
      aspectScale: 0.8, // 比例
      layoutCenter: ["50%", "43%"], // position位置
      layoutSize: 340, // 地图大小，保证了不超过 370x370 的区域
      label: {
        // 图形上的文本标签
        normal: {
          show: true,
          textStyle: {
            color: "rgba(0, 0, 0, 0.9)",
            fontSize: '8'
          }
        },
        emphasis: { // 高亮时样式
          color: "#333"
        }
      },
      itemStyle: {
        // 图形上的地图区域
        normal: {
          borderColor: "rgba(0,0,0,0.2)",
          areaColor: "#005dff"
        }
      }
    }],
    visualMap: {
      type: "piecewise",
      splitNumber: 5,
      pieces: [{
          min: 1000,
          label: ">1000"
        }, // 不指定 max，表示 max 为无限大（Infinity）。
        {
          min: 100,
          max: 999,
          label: "100-999"
        },
        {
          min: 10,
          max: 99,
          label: "10-99"
        },
        {
          min: 1,
          max: 9,
          label: "1-9"
        }, // 表示 value 等于 123 的情况。
        {
          value: 0,
          label: "0"
        } // 不指定 min，表示 min 为无限大（-Infinity）。
      ],
      textStyle: {
        fontSize: 10
      },
      realtime: false,
      calculable: false,
      inRange: {
        color: ['lightskyblue', 'yellow', 'orangered'],
      },
      orient: "horizontal",
      bottom:10,
      left: 50,
      itemHeight: 10,
      itemWidth: 10,
    },
    series: [{
      type: 'map',
      mapType: '上海',
      geoIndex: 0,
      roam: false, // 鼠标是否可以缩放
      label: {
        normal: {
          show: true
        },
        emphasis: {
          show: true
        }
      },
      data: mapDate
    }]
  };

}

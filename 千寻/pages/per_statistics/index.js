import * as echarts from '../../ec-canvas/echarts';

Page({
  data: {
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());
  
        return barChart;
      }
    },

    ecScatter: {
      onInit: function (canvas, width, height, dpr) {
        const scatterChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });

        canvas.setChart(scatterChart);
        scatterChart.setOption(getScatterOption());

        return scatterChart;
      }
    },

    ecpie: {
      onInit: function (canvas, width, height, dpr) {
        const pieChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });

        canvas.setChart(pieChart);
        pieChart.setOption(getpieOption());

        return pieChart;
      }
    }
  },

  onLoad: function (options) {

  },

  onReady() {
  },
  onShow: function() {
    
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
          [10, '其他'],
          [20, '文具'],
          [18, '饰品'],
          [20, '钥匙'],
          [2, '衣物'],
          [16, '化妆品'],
          [4, '数码设备'],
          [9, '证件或卡'],
          [1, '宠物']
      ]
  },
  // grid: {containLabel: true},
  grid:{
    left:60,
    top:50,
    bottom:30
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
      },

      }
  ]
  };
}

function getScatterOption() {
  return {
    title: {
      text: '我丢失的',
      subtext:'共计74个物品'
    },
    grid:{
      left:60,
      top:70,
      bottom:30
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
      type: 'value'
  },
  series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true,
      lineStyle:{
        normal:{
          color:'#6495ED',
          width:3
        }
      },
      itemStyle:{
        normal:{
          label : {
            show: true,
            color:'#5F9EA0'
            },
            borderColor:'#5F9EA0'
        }
      }
  }]
  };

}

function getpieOption() {
  return {
    title: {
      text: '我完成的',
      subtext:'共计74个任务'
    },
    color:['#FFD700','#D2691E'],
    tooltip: {
      trigger: 'item'
  },
  legend: {
      bottom: '5%',
      right: '5%'
  },
  series: [
      {
          name: '所有任务',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
          },
          label: {
              show: false,
              position: 'center'
          },
          emphasis: {
              label: {
                  show: true,
                  fontSize: '40',
                  fontWeight: 'bold'
              }
          },
          labelLine: {
              show: false
          },
          data: [
              {value: 20, name: '已完成'},
              {value: 54, name: '未完成'}
          ]
      }
  ]
  };

}

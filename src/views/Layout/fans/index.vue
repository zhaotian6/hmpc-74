<template>
  <div class="fans">
    <el-card>
      <template v-slot:header>
        <hm-breadcrumb>粉丝管理</hm-breadcrumb>
      </template>
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="粉丝列表" name="list">
          <el-row :gutter="20">
            <el-col v-for="item in 16" :key="item" :span="3">
              <div class="item">
                <el-avatar :size="80" src="~@/assets/favicon.ico"></el-avatar>
                <p>刘东东</p>
                <el-button type="primary" plain size="small">+关注</el-button>
              </div>
            </el-col>
          </el-row>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-size="per_page"
            layout="total, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="chart">
          <div class="chart" ref="chart" >123</div>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
  name: 'fans',
  data () {
    return {
      activeName: 'list',
      list: [],
      per_page: 11,
      page: 1,
      total: 10
    }
  },
  methods: {
    handleClick () {
      if (this.activeName === 'list') {
        return
      }
      // 初始化echarts
      // 1. 创建myChart对象
      const myChart = echarts.init(this.$refs.chart)
      const option = {
        title: {
          text: '粉丝列表'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '粉丝列表',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
          showBackground: true,
          backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
          }
        }]
      }
      myChart.setOption(option)
    }
  }

}
</script>
<style scoped lang='less'>
.el-col {
  margin-bottom: 20px;
  .item {
    width: 100%;
    height: 180px;
    border: 1px dashed #ddd;
    text-align: center;
    padding-top: 10px;
    p {
      margin: 10px 0;
    }
  }
}
.chart {
  width: 600px;
  height: 400px;
}
</style>

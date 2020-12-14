<template>
    <div class="articles">
    <el-card>
      <!-- 卡片标题 -->
      <div slot="header">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <div><el-form :model="form" label-width="80px">
        <el-form-item label="状态">
          <el-radio-group v-model="form.resource">
            <el-radio label="全部"></el-radio>
            <el-radio label="草稿"></el-radio>
            <el-radio label="待审核"></el-radio>
            <el-radio label="审核通过"></el-radio>
            <el-radio label="审核失败"></el-radio>
            <el-radio label="已删除"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
</div>
    </el-card>

    <el-card style="margin-top: 40px">
      <div slot="header">
        <span>根据筛选条件查询到46153条数据,当前是第1页：</span>
      </div>
      <div>
        <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column label="封面" >
          <template v-slot="{ row }">
            <el-image style="width: 180px; height: 100px" :src="row.cover.images[0]" fit="cover"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="status" label="状态">
          <template v-slot="{ row }">
            <el-tag v-if="row.status === 0">草稿</el-tag>
            <el-tag v-else-if="row.status === 1"  type="info" >待审核</el-tag>
            <el-tag v-else-if="row.status === 2" type="success" >审核通过</el-tag>
            <el-tag v-else-if="row.status === 3" type="warning" >审核失败</el-tag>
            <el-tag v-else type="danger" >已删除</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间" > </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size='small'></el-button>
          </template>
        </el-table-column>
      </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getarticles } from '@/api/articles'
export default {
  data () {
    return {
      form: {
        resource: '全部',
        region: '',
        date: ''
      },
      tableData: [],
      total: ''
    }
  },
  created () {
    getarticles().then(res => {
      console.log(res)
      this.tableData = res.data.results
      this.total = res.data.total_count
    }).catch(error => {
      console.log(error)
    })
  }
}
</script>

<style>

</style>

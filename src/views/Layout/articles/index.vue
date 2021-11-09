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
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <channels v-model="form.channel_id"></channels>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            value-format="yyyy-MM-dd"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="fn" :loading="loading1">查询</el-button>
        </el-form-item>
      </el-form>
</div>
    </el-card>

    <el-card style="margin-top: 40px" v-loading="loading1">
      <div slot="header">
        <span>根据筛选条件查询到{{total}}条数据,当前是第1页：</span>
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
          <template v-slot="{ row }">
            <el-button type="primary" icon="el-icon-edit" circle size="small"></el-button>
            <el-button type="danger" icon="el-icon-delete" circle size='small' @click="del(row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40, 50]"
        :total="total"
        :page-size="per_page"
        :current-page="page"
        @current-change="currentChange"
        @size-change="sizeChange"
      >
      </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getarticles, delet } from '@/api/articles'
export default {
  data () {
    return {
      form: {
        date: [],
        status: null,
        channel_id: null
      },
      tableData: [],
      total: 0,
      page: 1,
      per_page: 10,
      loading1: false
    }
  },
  created () {
    this.getlist()
  },
  methods: {
    getlist () {
      this.loading1 = true
      const [begin, end] = this.form.date || []
      getarticles({
        page: this.page,
        perpage: this.per_page,
        begin_pubdate: begin,
        end_pubdate: end,
        status: this.form.status,
        channel_id: this.form.channel_id || null
      }).then(res => {
        this.tableData = res.data.results
        this.total = res.data.total_count
        this.loading1 = false
      }).catch(error => {
        console.log(error)
        this.loading1 = false
      })
    },
    currentChange (val) {
      this.page = val
      this.getlist()
    },
    sizeChange (val) {
      this.per_page = val
      this.page = 1
      this.getlist()
    },
    fn () {
      this.page = 1
      this.getlist()
    },
    del (id) {
      const idd = id.toString()
      this.$confirm('确认要删除吗', '温馨提示', {
        type: 'warning'
      }).then(() => {
        delet(idd).then(() => {
          this.$message.success('删除成功')
          this.getlist()
        }).catch(() => {
          this.$message.error('删除失败')
        })
      }).catch(() => {
        console.log('删除失败')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  ::v-deep {
    .el-date-editor .el-range-separator {
      padding: 0;
    }
  }
}
</style>

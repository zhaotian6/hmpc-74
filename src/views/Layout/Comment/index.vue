<template>
  <div class="comments">
    <el-card>
      <template #header>
        <hm-breadcrumb>评论管理</hm-breadcrumb>
      </template>
      <el-table :data="comments" border>
        <el-table-column
          align="center"
          label="序号"
          type="index"
          width="100"
        ></el-table-column>
        <el-table-column
          align="center"
          label="文章标题"
          prop="title"
        ></el-table-column>
        <el-table-column align="center" label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column align="center" label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column align="center" label="评论状态">
          <template v-slot="{ row }">
            <el-tag type="success" v-if="row.comment_status">正常</el-tag>
            <el-tag type="danger" v-else>关闭</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template v-slot="{ row }">
            <el-button @click="updateComment(row.id.toString(), false)" size="mini" type="danger" v-if="row.comment_status">关闭评论</el-button>
            <el-button @click="updateComment(row.id.toString(), true)" size="mini" type="primary" v-else>打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="per_page"
        layout="total, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getarticles, updateCommentStatus } from '@/api/articles'
export default {
  data () {
    return {
      comments: [],
      per_page: 12,
      page: 1,
      total: null
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      const res = await getarticles({
        page: this.page,
        per_page: this.per_page,
        response_type: 'comment'
      })
      console.log(res)
      this.comments = res.data.results
      this.total = res.data.total_count
    },
    async updateComment (id, status) {
      const res = await updateCommentStatus(id, status)
      console.log(res)
      this.getList()
      this.$message.success('修改成功')
    },
    handleCurrentChange (val) {
      this.page = val
      this.getList()
    }
  }
}
</script>

<style>

</style>

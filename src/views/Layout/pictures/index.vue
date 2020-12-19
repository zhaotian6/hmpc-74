<template>
  <div class="pictures">
    <el-card>
      <template #header>
        <hm-breadcrumb>素材管理</hm-breadcrumb>
      </template>
      <!-- 单选按钮 -->
      <el-radio-group v-model="collect" @change="change">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <el-button type="success" style="float: right" @click="dialogVisible = true" >上传素材</el-button>
      <!-- 图片 -->
      <el-row :gutter="10">
        <el-col :span="4" v-for="item in images" :key="item.id">
          <el-image
            src='item.url'
            style="width: 100%; height: 180px"
            fit="cover"
          ></el-image>
          <div class="bottom" >
            <span :class="{active: item.is_collected}" class="el-icon-star-off" @click="toggleCollect(item)"></span>
            <span class="el-icon-delete" @click="del(item.id)"></span>
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
    <el-dialog
      title="上传素材"
      :visible.sync="dialogVisible"
      width="30%">
      <el-upload
        class="avatar-uploader"
        :action="action"
        :show-file-list="false"
        :headers="headers"
        name="image"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getImages, collectPicture, deletePicture, uploadUrl } from '@/api/pictures.js'
import { getToken } from '@/utils/Storage.js'
export default {
  name: 'Pictures',
  data () {
    return {
      radio1: '1',
      images: [],
      page: 1,
      per_page: 12,
      total: 10,
      is_collected: true,
      collect: false,
      dialogVisible: false,
      imageUrl: '',
      action: uploadUrl,
      headers: {
        Authorization: 'Bearer ' + getToken()
      }
    }
  },
  created () {
    this.fn()
  },
  methods: {
    async fn () {
      try {
        const res = await getImages({
          page: this.page,
          per_page: this.per_page,
          collect: this.collect
        }
        )
        console.log(res)
        this.total = res.data.total_count
        this.is_collected = res.data.is_collected
        this.images = res.data.results
      } catch (err) {
        console.log(err)
      }
    },
    handleCurrentChange (val) {
      this.page = val
      this.fn()
    },
    async toggleCollect (item) {
      await collectPicture(item.id, !item.is_collected)
      this.$message.success(item.is_collected ? '取消收藏' : '收藏成功')
      this.fn()
    },
    async del (id) {
      try {
        await this.$confirm('确定要删除吗', '温馨提示', { type: 'warning' })
      } catch {
        this.$message.info('取消删除')
        return
      }
      try {
        await deletePicture(id)
        this.$message.success('删除成功')
        this.fn()
      } catch {
        this.$message.error('删除失败')
      }
    },
    change () {
      this.page = 1
      this.fn()
    },
    beforeAvatarUpload (file) {
      if (file.size >= 40 * 1024) {
        this.$message.error('上传图片不能超过40KB')
        return false
      }
      const allowList = ['image/gif', 'image/png']
      if (!allowList.includes(file.type)) {
        this.$message.error('图片格式错误')
        return false
      }
      return true
    },
    handleAvatarSuccess (res) {
      this.imageUrl = res.data.url
      // 延时关闭弹窗
      setTimeout(() => {
        this.dialogVisible = false
        this.$message.success('上传成功')
        this.fn()
        this.imageUrl = ''
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.el-row {
  margin-top: 20px;
    .el-col {
    margin-bottom: 8px;
    position: relative;
    .bottom {
      position: absolute;
      bottom: 0;
      left: 5px;
      right: 5px;
      height: 30px;
      background-color: rgba(0,0,0,.4);
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        color: #fff;
        cursor: pointer;
      }
      .active {
        color: red;
      }
    }
  }
}

</style>

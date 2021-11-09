<template>
  <div class="my-cover">
    <!-- 图片按钮 -->
    <div class="btn_img" @click="dialogVisible = true">
      <img :src="showImage" style="object-fit:cover" />
    </div>
    <!-- 对话框 -->
  <el-dialog
    title="上传封面"
    :visible.sync="dialogVisible"
    width="720px">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="素材库" name="image">
        <el-radio-group v-model="collect" @change="change">
        <el-radio-button :label="false">全部</el-radio-button>
        <el-radio-button :label="true">收藏</el-radio-button>
      </el-radio-group>
      <!-- 图片 -->
      <el-row :gutter="10">
        <el-col :span="6" v-for="item in images" :key="item.id"  >
          <el-image
            @click.native="select(item.url)"
            :class=" {selected: item.url === selectedImageUrl }"
            :src='item.url'
            style="width: 100%; height: 180px"
            fit="cover"
          ></el-image>
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
      <el-tab-pane label="上传图片" name="upload">
      <el-upload
        class="avatar-uploader"
        action=""
        :show-file-list="false"
        :http-request="upload">
        <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      </el-tab-pane>
    </el-tabs>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </span>
  </el-dialog>
  </div>
</template>

<script>
import { getImages, uploadPicture } from '@/api/pictures.js'

export default {
  props: ['value'],
  name: 'cover',
  data () {
    return {
      dialogVisible: false,
      activeName: 'image',
      images: [],
      page: 1,
      per_page: 8,
      total: 10,
      is_collected: true,
      collect: false,
      uploadImageUrl: '',
      selectedImageUrl: '',
      showImage: this.value || require('@/assets/default.png')
    }
  },
  created () {
    this.fn()
  },
  watch: {
    value () {
      this.showImage = this.value || require('@/assets/default.png')
    }
  },
  methods: {
    change () {
      this.page = 1
      this.fn()
    },
    handleCurrentChange (val) {
      this.page = val
      this.fn()
    },
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
    select (url) {
      this.selectedImageUrl = url
    },
    async upload ({ file }) {
      const fd = new FormData()
      fd.append('image', file)
      const res = await uploadPicture(fd)
      this.uploadImageUrl = res.data.url
    },
    confirm () {
      if (this.activeName === 'image') {
        if (this.selectedImageUrl) {
          this.url1 = this.selectedImageUrl
          this.dialogVisible = false
        } else {
          return this.$message.warning('请选择一张图片')
        }
      } else {
        if (this.uploadImageUrl) {
          this.url1 = this.uploadImageUrl
          this.dialogVisible = false
        } else {
          return this.$message.warning('请上传一张图片')
        }
      }
    }
  }
}
</script>

<style scoped lang='less'>
// 图片按钮
.btn_img {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.selected {
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.3) url(~@/assets/selected.png) no-repeat center / 50px 50px;
  }
}
</style>

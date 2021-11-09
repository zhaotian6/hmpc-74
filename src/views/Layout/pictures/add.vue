<template>
  <div class="publish-container">
    <el-card>
      <template v-slot:header>
        <hm-breadcrumb>发布文章</hm-breadcrumb>
      </template>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="标题" prop="title">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <quill-editor @blur="onBlur" @change="onBlur" v-model="form.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="form.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.cover.type > 0" >
          <cover v-for="(item, index ) in form.cover.type" :key="item" v-model="form.cover.images[index]" class="img1">
          </cover>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <channels v-model="form.channel_id" ></channels>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="add">发表</el-button>
          <el-button>存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { addArticle } from '@/api/articles'
export default {
  name: 'AddArticle',
  data () {
    return {
      form: {
        title: '',
        content: '',
        cover: {
          // 封面
          type: 0, // 封面图片的张数
          images: [] // 封面的地址
        },
        channel_id: null
      },
      rules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在5到30之间', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: ['blur', 'change'] },
          {
            validator:
              (rule, value, callback) => {
                value = this.filter(value)
                if (value.length < 10) {
                  callback(new Error('内容长度不能小于10'))
                } else {
                  callback()
                }
              }
          }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: 'blur' }
        ]
      },
      editorOption: {
        placeholder: '请输入内容'
      }
    }
  },
  methods: {
    add () {
      this.$refs.form.validate(async valid => {
        if (!valid) {
          return
        }
        try {
          await addArticle(this.form)
          this.$message.success('文章发表成功')
          this.$router.push('/articles')
        } catch {
          this.$message.error('发表失败')
        }
      })
    },
    onBlur () {
      // 只对内容进行校验
      this.$refs.form.validateField('content')
    },
    filter (text) {
      var reg = /<[^<>]+>/g// 1、全局匹配g肯定忘记写,2、<>标签中不能包含标签实现过滤HTML标签
      text = text.replace(reg, '')// 替换HTML标签
      text = text.replace(/&nbsp;/ig, '')// 替换HTML空格
      return text
    }
  }
}
</script>

<style lang="less" scoped>
.publish-container {
  ::v-deep {
    .ql-snow .ql-picker-label::before,
    .ql-snow .ql-color-picker .ql-picker-label svg, .ql-snow .ql-icon-picker .ql-picker-label svg {
      float: left;
    }
    .ql-editor {
      height: 300px;
    }
  }
  .img1 {
    float: left;
    padding-right: 5px;
  }
}
</style>

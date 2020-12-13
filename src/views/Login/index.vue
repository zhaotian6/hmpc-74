<template>
  <div class="add">
    <div class="login">
    <div class="imgs">
      <img src="~@/assets/logo_index.png" alt="">
    </div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item prop="mobile">
        <el-input v-model="form.mobile" placeholder="请输入手机号" ></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="form.code" placeholder="请输入验证码" ></el-input>
      </el-form-item >
      <el-form-item class="agree" prop="agree">
        <el-checkbox  v-model="form.agree">我已阅读用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="btn1" @click="login" >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { setToken } from '../../utils/Storage'
export default {
  // 方便开发者工具显示
  name: 'Login',
  data () {
    return {
      form: {
        mobile: '13911111111',
        code: '246810',
        agree: true
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: ['blur', 'change'] },
          { pattern: /^1\d{10}$/, message: '请输入正确的手机号', trigger: ['blur', 'change'] }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: ['blur', 'change'] },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码', trigger: ['blur', 'change'] }
        ]
      },
      agree: [
        {
          // rule 当前规则相关的信息, 比如字段名是 'agree'
          // value 表示当前校验的值
          // callback 回调函数, 成功直接callback(), 失败callback(new Error('错误提示'))
          validator: function (rule, value, callback) {
            if (value === false) {
              callback(new Error('请同意用户协议'))
            } else {
              callback()
            }
          },
          trigger: 'change'
        }
      ]
    }
  },
  methods: {
    login () {
      this.$refs.form.validate().then(() => {
        console.log('校验成功了')
      }).catch(() => {
        console.log('校验失败')
      })
      if (!this.form.agree) {
        this.$message({
          message: '请同意用户许可',
          type: 'error',
          showClose: true
        })
        return
      }
      login(this.form.mobile, this.form.code).then(res => {
        this.$message.success('登录成功')
        setToken(res.data.token)
        this.$router.push('/')
      }).catch(e => {
        this.$message.error('登录失败, 手机号或者验证码错误')
      })
    }
  }
}
</script>

<style lang='less' scoped>
  .add{
    width: 100%;
    height: 100%;
    background: url('../../assets/login_bg.jpg') no-repeat;
    .login{
      width: 400px;
      height: 345px;
      background-color: #fff;
      position: absolute;
      margin: auto;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      .el-form{
        margin: 40px;
        margin-top: 0px;
      }
      .btn1{
        width: 100%;
      }
      .check{
        margin-top: 20px;
      }
      .imgs{
        width: 300px;
        height: 57px;
        margin-left: 50px;
        margin-top: 30px;
        margin-bottom: 10px;
        img{
          width: 200px;
          text-align: center;
          margin-left: 45px;
        }
      }
    }
  }
</style>

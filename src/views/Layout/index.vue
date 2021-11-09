<template>
  <div class="layout-container">
    <el-container>
      <el-aside :width="isCollapse ? '64px': '200px'">
        <!-- logo -->
        <div class="logo" :class="{minLogo: isCollapse}" ></div>
        <!-- 菜单区域 -->
        <div>
          <el-menu background-color="#002033" text-color="#fff" :default-active="$route.path" active-text-color="#ffd04b" :collapse="isCollapse" router :collapse-transition="false">
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/articles">
            <i class="el-icon-document"></i>
            <span slot="title">内容管理</span>
          </el-menu-item>
          <el-menu-item index="/pictures">
            <i class="el-icon-picture"></i>
            <span slot="title">素材管理</span>
          </el-menu-item>
          <el-menu-item index="/addvue">
            <i class="el-icon-s-promotion"></i>
            <span slot="title">发布文章</span>
          </el-menu-item>
          <el-menu-item index="/Comment">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item index="/fans">
            <i class="el-icon-setting"></i>
            <span slot="title">粉丝管理</span>
          </el-menu-item>
          <el-menu-item index="/settings">
            <i class="el-icon-setting"></i>
            <span slot="title">个人设置</span>
          </el-menu-item>
        </el-menu>
        </div>
      </el-aside>
      <el-container>
        <!-- 头部位置 -->
        <el-header>
          <div class="left">
            <i class="el-icon-s-fold" @click="isCollapse = !isCollapse" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'" ></i>
            <span>黑马前端74期</span>
          </div>
          <el-dropdown>
          <div class="avatar-wrap">
            <img class="avatar" :src="user.photo" alt="">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>

    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item>设置</el-dropdown-item>
      <el-dropdown-item @click.native="getout">退出</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
        </el-header>
        <!-- 内容部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { layout } from '@/api/user'
import { removeToken } from '../../utils/Storage.js'
export default {
  name: 'Layout',
  data () {
    return {
      isCollapse: false,
      user: {}
    }
  },
  created () {
    layout().then(res => {
      console.log(res)
      this.user = res.data
    }).catch(error => {
      return console.log(error)
    })
  },
  methods: {
    getout () {
      this.$confirm('确定要退出吗', '温馨提示', {
        type: 'warning'
      }).then(() => {
        this.$router.push('/login')
        removeToken('hmtt-74-token')
        this.$message.success('退出成功')
      }).catch(() => {
        this.$message.error('退出失败')
      })
    }
  }
}
</script>

<style lang="less">
.layout-container {
  width: 100%;
  height: 100%;
  .el-container {
    width: 100%;
    height: 100%;
  }
  .el-aside {
    transition: all .3s;
    background-color: #002033;
  }
  .el-header {
    background-color: #b3c0d1;
  }
  .el-main {
    background-color: #e9eef3;
  }
  .el-aside {
  .el-menu {
    border-right: none;
  }
  .logo {
      width: 100%;
      height: 60px;
      background: #002244 url(~@/assets/logo_admin.png) no-repeat center;
      background-size: 140px auto;
      &.minLogo{
        background-image: url(../../assets/logo_admin_01.png);
        background-size: 36px auto;
      }
    }
}
.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  .avatar-wrap {
    display: flex;
    align-items: center;
    cursor: pointer;
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
  }
}
}
</style>

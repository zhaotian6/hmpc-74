<template>
    <el-select :value="value" placeholder="请选择频道" clearable @change="change1">
      <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id" @></el-option>
    </el-select>
</template>

<script>
import { getchannels } from '@/api/articles'

export default {
  name: 'channels',
  props: ['value'],
  data () {
    return {
      channels: []
    }
  },
  async created () {
    const res = await getchannels()
    console.log(res)
    this.channels = res.data.channels
  },
  methods: {
    change1 (value) {
      this.$emit('input', value)
    }
  }
}
</script>

<style>

</style>

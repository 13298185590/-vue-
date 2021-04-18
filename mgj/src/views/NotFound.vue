<template>
  <div>
    <h1>页面走丢了</h1>
    <button @click="back">返回</button>
  </div>
</template>

<script>
export default {
  methods:{
    back(){
      this.$router.back()
    }
  }
}
</script>

<style>

</style>
<template>
  <div class="tab-bar-item" @click="itemClick" :style="activeStyle">
    <!-- vue slot插槽 -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name:'tabbaritem',
  props:{
    path:String,//路由
    activColor:{
      type:String,
      default:'red'
    }
  },
  computed:{
    isActive(){
      if(this.$route.path==this.path){
        return true
      }else{
        return false
      }
    },
    activeStyle(){
      return this.isActive ? {color:this.activColor}:{}
    }
  },
  methods:{
    itemClick(){
      this.$router.replace(this.path)
    }
  }
}
</script>

<style scoped > 
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 56px;
  font-size: 14px;
  line-height: 56px;
}
</style>
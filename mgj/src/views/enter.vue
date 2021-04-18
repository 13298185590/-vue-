<template>
    <div>
      <!-- 路由切换 -->
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
      <!-- 底部导航 -->
      <tabbar>
        <tabbarItem path='/home'>首页</tabbarItem>
        <tabbarItem path='/search'>搜索</tabbarItem>
        <tabbarItem path='/cart'>购物车</tabbarItem>
        <tabbarItem path='/center'>我的</tabbarItem>
      </tabbar>
    </div>
    
</template>
<script>
import tabbar from '../components/tabbar/tabbar.vue'
import tabbarItem from '../components/tabbar/tabbaritem.vue'
export default {
    name:'enter',
    components:{
      tabbar,tabbarItem
    }
}
</script>
<style lang="lass">

</style>

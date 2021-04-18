import Vue from 'vue'
import vueRouter from 'vue-router'
import enter from '../views/enter'
import home from '../views/home/home'
import search from '../views/search/search'
import center from '../views/center/center'
import adress from '../views/center/adress'
import centerCollect from '../views/center/centerCollect'
import centerOrder from '../views/center/centerOrder'
import cart from '../views/cart/cart'
import order from '../views/cart/order'
import payment from '../views/payment/payment'
import chat from '../views/chat/chat'
import chatshop from '../views/chat/chatshop'
import chatshopuser from '../views/chat/chatshopuser'

//导入登录组件
import login from '../components/start/login'
import register from '../components/start/register'

//导入商品详情页组件
import goods from '../views/goods/good'

//搜索界面
import serachItem from '../views/search/serachItem'

//导入404页面
import NotFound from '../views/NotFound'

Vue.use(vueRouter)
//引入路由
const routes = [
  { path: '/', redirect: '/enter' },  //入口
  { path:"/login",component:login,meta: { isLogin: true }},
  { path:"/register",component:register,meta: { isLogin: true }},
  { path:"/serachItem",name:serachItem,component:serachItem,meta: { isLogin: true }},
  { path: '/goods/:id', name: 'goods', component: goods },  //query  params  body
  { path: '/adress', component: adress, name: 'adress' },
  { path: '/centerOrder', component: centerOrder,name:"centerOrder" },
  { path: '/chat', component: chat, name: 'chat' },
  { path: '/order', component: order, name: 'order' },
  { path: '/payment', component: payment, name: 'payment' },
  { path: '/chatshop', component: chatshop, name: 'chatshop' },
  { path: '/chatshopuser', component: chatshopuser, name: 'chatshopuser' },
  { path: '/enter', component: enter, children: [
     { path: '/', redirect: '/home', meta: { isLogin: true } },
     { path: '/home', component: home, meta: { isLogin: true } },
     { path: '/search', component: search, meta: { isLogin: true } },
     { path: '/cart', component: cart, meta: { isLogin: false } },
     { path: '/center', component: center, meta: { isLogin: false } },
     { path: '/centerCollect', component: centerCollect, meta: { isLogin: false } }
   ] 
  },

  //404页面路由
  { path: '*', component:NotFound, meta: { isLogin: false }},  
]
// 创建router实例
const router = new vueRouter({
    routes
})

//路由守卫
router.beforeEach((to,from,next)=>{
  if(to.meta.isLogin){  //有些页面不需要强制登录
    next()
  }else{
    let token=localStorage.getItem('my-token')
    // console.log(token)
    if(!token){
      // next('/login')
      //Error: Redirected when going from "/search" to "/cart" via a navigation guard.
         //路由跳转重复
         //将错误抛出来
        //  next({ path: '/login'});  
        router.replace('/login')
    }else{
      next()
    }
  }
})
// 导出router
export default router
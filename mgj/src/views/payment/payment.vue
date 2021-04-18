<template>
  <div class="payment">
    <NavBar>
      <div slot="left" @click="goBack">
        <span class="iconfont icon-tubiaozhizuo--"></span>
      </div>
      <div slot="center">支付订单</div>
    </NavBar>
    <!-- info -->
    <div class="payInfo">
        <p style="width:100%;text-algin:center;color:#999999;font-size:10px">支付金额</p>
        <p style="font-size:25px;width:100%;text-align:center;margin-top:10px'">￥{{price}}</p>
    </div>
    <!-- 支付方法 -->
    <div class="payMethod">
      <div class="method" @click="payState=0">
        <p>
          <img src="./weixin.png.jpg" alt="" style='width:30px;height:30px;position:relative;top:8px'>
          微信支付
        </p>
        <div class='p1'>
          <div :class='payState==0? "p2":""'></div>
        </div>
      </div>
      <div  class='method' @click='payState=1'>
        <p>
          <img src="./zhifubao.png.png" alt="" style='width:30px;height:30px;position:relative;top:8px'>
         支付宝
        </p>
        <div class='p1'>
          <div :class='payState==1? "p2":""'></div>
        </div>
      </div>
    </div>
    <!-- 支付按钮 -->
    <div @click="pay" class="payButton">确认支付</div>
  </div>
</template>

<script>
import NavBar from '../../components/common/NavBar'
import {payor} from '../../api/adminapi'
export default {
  data(){
    return{
      price:"",
      orderId:"",
      //0微信 1支付宝
      payState:0
    }
  },
  activated() {
    this.price=this.$route.query.parice
    this.orderId=this.$route.query.orderId
    // console.log(this.price)
  },
  methods:{
    async pay(){
      const result=await payor(this.$qs.stringify({orderId:this.orderId}))

      if(result.data.success){
        this.$alert.success('支付成功',2000)
        this.$router.push('/center')

      }
    },
    goBack(){
      this.$router.go(-1)
    }
  },
  components:{
    NavBar
  }
}
</script>

<style scoped>
.payment{
  background: #f7f2f2;
  min-height: 700px;
}
.payButton{
  position: fixed;
  height:44px;
  line-height: 44px;
  text-align: center;
  color:white;
  background: red;
  bottom:0;
  border-radius: 10px;
  width:100%
}
.payInfo{
  margin-top:30px;
}
.payMethod{
  background: white;
  margin-top:60px;
  margin-left:15px;
  margin-right: 15px;
  border-radius: 15px;
  padding:25px;
  box-sizing: border-box;
  padding-top:10px
}
.method{
  display: flex;
  justify-content: space-between;
  padding:15px;

  box-sizing: border-box;
  border-bottom:1px solid #e3e3e3
}
.p1{
  width: 18px;
  height:18px;
  border:1px solid #999999;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top:12px;
}
.p2{
   width: 18px;
  height:18px;
  background: red;
  border-radius: 100%;
  position: relative;
}
</style>
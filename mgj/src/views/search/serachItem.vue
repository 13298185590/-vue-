<template>
  <div class="search-item">
    <narBar class="narBar">
      <div slot="left" @click="getBack">
        <span class="iconfont icon-tubiaozhizuo--"></span>
      </div>
      <div slot="center">
        <input type="text" name="" id="" v-model="searchText" @focus="goSearch">
      </div>
      <div slot="right"><span class="iconfont icon-shoppingcopy"></span></div>
    </narBar>
    <!-- 头部 -->
    <div class="header">
      <div v-for="(item,index) in headers"
        :key="index"
        @click="getIndex(index)"
        :class="index==headerIndex?'red':''"
      > <span>{{item}}</span>
      </div>
    </div>
    <!-- 价格选择 -->
    <div class="price-select" v-show="headerIndex==3">
      <div>
        <span @click="sortPrice(0)">由低到高</span>
        <span @click="sortPrice(1)">由高到低</span>
      </div>
      <div>
        <span style="margin-right:15px">区间(元)</span>
        <input type="text" v-model="serchprice.low">-
        <input type="text" v-model="serchprice.high">
        <span class="btn" @click="sortPrice(3)">确认</span>
        
      </div>
    </div>
    <!-- 商品 -->
    <div class="itemPicture">
      <div class="itemPic"
          v-for="(item,index) in trueListItem"
          :key="index"
          @click="goGoodDetail(item['s_uid'])"
      >
      <img :src="item['s_img_one']" alt="">
      <div class="text"><span class="span1">推荐</span><span>{{item['s_msg']}}</span></div>
      <div class="bottom-text">
        <span class="price">${{item['s_newPrice']}}</span>
        <span class="bottom-text-right">{{item['s_collect']}}<span class="iconfont icon-collect"></span></span>
      </div>
      
      </div>
    </div>

    
  </div>
</template>

<script>
import narBar from '../../components/common/NavBar'
import {searchgoodlist} from '../../api/searchapi'
export default {
  name:"serachItem",
  components:{
    narBar
  },
  data(){
    return{
      headers:['综合','销量','新品','价格'],//头部导航
      headerIndex:0,
      searchText:'', //搜索框的内容
      listItem:[],   //商品信息
      trueListItem:[],  
      searchText:'',  //页面传递过来的参数
      serchprice:{  //价格
        low:"",
        high:''
      }
    }
  },
  watch:{
    headerIndex(val){
      if(val==0){
        this.trueListItem=this.listItem
      }
      if(val==1){  //按销量排序
        let arr=this.listItem.sort(function(a,b){
          if(a['s_shop_vendre']>b['s_shop_vendre']){
            return 1
          }else{
            return -1
          }
        })
        this.trueListItem=arr
      }
      
    }
  },
  activated() {
    this.searchText=this.$route.query.searchText
    this.getGoodsList()
  },
  methods:{
    //查询商品列表
    async getGoodsList(){
      const result = await searchgoodlist({s_msg:this.searchText})
      try{
        this.listItem=result.data
        this.trueListItem=this.listItem
      }catch(e){
        console.log(e)
      }
    },
    //价格排序规则
    sortPrice(i){
      if(i==0){   //从低到高
        let arr=this.listItem.sort(function(a,b){
          if(a['s_newPrice']>b['s_newPrice']){
            return 1
          }else{
            return -1
          }
        })
        this.trueListItem=arr
      }
      if(i==1){   //从高到低
        let arr=this.listItem.sort(function(a,b){
          if(a['s_newPrice']>b['s_newPrice']){
            return -1
          }else{
            return 1
          }
        })
        this.trueListItem=arr
      }
      if(i==3){
        let row=Number(this.serchprice.low==''?0:this.serchprice.low)
        let high=Number(this.serchprice.high==''?9999:this.serchprice.high)
        let arr=this.listItem.filter(function(a){
          
          return (high>a['s_newPrice'])&&row<(a['s_newPrice'])

        })
        this.trueListItem=arr
      }
    },
    //切换筛选规则
    getIndex(index){
      this.headerIndex=index
    },
    //失去焦点搜索
    goSearch(){
      this.$router.push('/search')
    },
    //返回上一级
    getBack(){
      this.$router.go(-1)
    },
    //跳转商品详情页
    goGoodDetail(id){
      this.$router.push('/goods/'+id)
    }
  }
}
</script>

<style scoped>
.search-item {
  height: 100%;
  min-height: 667px;
  background: #e7e7e7;
}
.narBar {
  background: white;
}
.narBar span {
  font-size: 23px;
  margin-left: 5px;
}
input {
  width: 300px;
  height: 26px;
  border: 1px solid #999999;
  border-radius: 6px;
  padding: 0 8px;
  box-sizing: border-box;
  font-size: 13px;
}
.header {
  display: flex;
  background: white;
  width: 375px;
  overflow: hidden;
}
.header div {
  flex: 1;
  height: 39px;
  font-size: 13px;
}
.header div span {
  position: relative;
  display: inline-block;
  width: 100%;
  top: 14.5px;
  text-align: center;
  border-left: 1px solid #e5e5e5;
}
.price-select {
  height: 70px;
  width: 100%;
  background: white;
  border-top: 1px solid #e9e9e9;
  padding-top: 10px;
}
.price-select div:nth-child(1) {
  display: flex;
  justify-content: space-around;
}
.price-select div:nth-child(1) span {
  width: 100px;
  height: 25px;
  display: inline-block;
  background: #e9e9e9;
  font-size: 15px;
  text-align: center;
  line-height: 25px;
}
.price-select div:nth-child(2) {
  font-size: 13px;
  padding: 10px;
}
.price-select div:nth-child(2) input {
  width: 85px;
  height: 30px;
  border: 1px solid #e9e9e9;
  margin-left: 3px;
  margin-right: 3px;
}
.price-select div:nth-child(2) .btn {
  width: 80px;
  display: inline-block;
  background: #ff5b76;
  color: white;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-left: 5px;
}
.itemPicture {
  display: flex;
  flex-wrap: wrap;
}
.itemPic {
  width: 170px;
  height: 267px;
  background: white;
  margin-left: 11.5px;
  margin-top: 11.5px;
  position: relative;
  font-size: 13px;
}
.itemPic img {
  width: 100%;
  height: 210px;
}
.span1 {
  color: #9999;
  font-size: 12px;
  margin-right: 8px;
  margin-left: 5px;
}
/* 问题 */
.text {
  white-space: pre;
  overflow: hidden;
  text-overflow: ellipsis;
  overflow-wrap: initial;
}
.itemPic .price {
  font-weight: 1000;
  font-size: 18px;
}
.red {
  color: red;
}
.bottom-text {
  margin-top: 15px;
  padding: 0 5px;
  display: flex;
  justify-content: space-between;
}
.bottom-text-right {
  color: #999999;
}
.icon-collect {
  margin-left: 3px;
}
</style>
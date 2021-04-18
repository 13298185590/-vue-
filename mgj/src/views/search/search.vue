<template>
  <div>
    <!-- 搜索框 -->
    <div class="search">
      <input type="text" placeholder="男衣" @keyup.enter="serach" v-model="searchText" ref="input" />
      <span @click="serach" >搜索</span>
    </div>
    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="search-history-top">
        <span class="iconfont icon-sousuo"></span>
        <span>搜索历史</span>
        <span @click="deleteSearchText">X</span>
      </div>
      <div class="search-history-title">
        <div v-for="(item, index) in searchHistory" :key="index">
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
    <!-- 搜索推荐 -->
    <div class="search-recommend">
      <div class="search-recommend-top">
        <span class="iconfont icon-collect"></span>
        <span>热门推荐</span>
      </div>
      <div class="search-recommend-title">
        <div
          v-for="(item, index) in searchRecommend"
          :key="index"
          :class="index == 2 ? 'red' : ''"
        >
          <span @click="tuijian(item)">{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {addsearch,getsearch,deletesearch} from '../../api/searchapi'
export default {
  name:'serachItem',
  data() {
    return {
      //搜索历史
      searchText: "",
      //搜索历史
      searchHistory: [],
      //搜索推荐
      searchRecommend: ["女衣", "阿迪达斯", "安德玛", "耐克"],
    };
  },
  methods: {
    //点击搜索按钮
    serach() {
      this.addSearchText()
      this.getSearchText()
      this.$router.push({path:'/serachItem',query: { searchText: this.searchText }})
    },
    //点击推荐的按钮
    tuijian(item){
      this.searchText=item
      this.serach()
    },
    //删除搜索历史
    async deleteSearchText() {
      const result=await deletesearch()
      this.getSearchText()
    },
    //添加搜索历史
    async addSearchText(){
      const result=await addsearch(this.$qs.stringify({searchText:this.searchText}))
      console.log(result)
    },
    //获取搜索历史
    async getSearchText(){
      const result=await getsearch()
      // console.log(result)
      this.searchHistory=result.data.data
    }
  },
  activated() {
    this.getSearchText()
  },
};
</script>
<style scoped>
input {
  padding: 8px 8px;
  border: 1px solid #e5e5e5;
  border-radius: 5px;
  height: 9px;
  width: 300px;
  margin-left: 10px;
  margin-top: 10px;
  font-size: 12px;
}
input::-webkit-input-placeholder {
  opacity: 0.5;
}
.search {
  height: 45px;
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
}
.search span {
  margin-left: 5px;
  font-size: 15px;
}
.search-history {
  width: 100%;
  height: 115px;
  border-bottom: 1px solid #e5e5e5;
  padding: 0 15px;
  box-sizing: border-box;
}
.search-history-top span {
  font-size: 15px;
}
.search-history-top span:nth-child(1) {
  font-size: 25px;
  position: relative;
  left: 0px;
  top: 4px;
}
.search-history-top span:nth-child(3) {
  margin-left: 240px;
}

.search-history-top {
  height: 30px;
  line-height: 28px;
  color: #999999;
}
.search-history-title {
  height: 85px;
  padding: 10px;
  box-sizing: border-box;
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.search-history-title div {
  margin-left: 8px;
  margin-bottom: 20px;
}
.search-history-title span {
  height: 25px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 3px 5px;
  font-size: 15px;
}
.search-recommend {
  height: 120px;
}
.search-recommend-top {
  height: 30px;
  padding-left: 13px;
}

.search-recommend-top span {
  line-height: 30px;
  font-size: 15px;
  color: #999999;
}
.search-recommend-top span:nth-child(2) {
  margin-left: 6px;
}

.search-recommend-title {
  height: 85px;
  padding: 15px 25px;
  box-sizing: border-box;
  padding-top: 15px;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
}
.search-recommend-title div {
  margin-left: 8px;
  margin-bottom: 20px;
}
.search-recommend-title span {
  height: 25px;
  border-radius: 3px;
  border: 1px solid #e5e5e5;
  padding: 3px 5px;
  font-size: 13px;
}

.red {
  color: red;
}
.green {
  color: green;
}
</style>
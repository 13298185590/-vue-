import ajax from "./request"
//1) 添加搜索历史
export const addsearch = (query) => ajax("api/users/searchHistory",query,'post')
//2) 删除搜索历史
export const deletesearch = (query) => ajax("api/users/deletrSearchHistory",query,'get')
//3) 获取搜索历史
export const getsearch = (query) => ajax("api/users/searchHistory",query,'get')
//4) 根据条件查询商品
export const searchgoodlist = (query) => ajax("api/shops/searchGoods",query,'post')
import ajax from "./request"
//1) 获取商品列表数据
export const goodslist = (query) => ajax("api/shops/getGoodsList",query,'post')
//2) 获取商品详情
export const goodsdetail= (query) => ajax("api/shops/getDetail",query,'post')
//1) 获取收藏商品列表get
export const goodslist1 = (query) => ajax("api/shops/getCollectList",query,'get')
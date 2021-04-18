import ajax from "./request"
//1)查询购物车数据 
//2)购物车删除
//3)添加购物车
export const addcart = (query) => ajax("api/users/addCart",query,"post")
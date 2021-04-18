import ajax from "./request"
//1) 登录
export const login = (query) => ajax("api/users/login",query,'post')
//2) 判断注册
export const isreg=(query) => ajax("api/users/account",query,"post")
//3) 注册
export const reg  = (query) => ajax("api/users/register",query,"post")
//4) 获取用户信息
export const getuserinfo=(query)=>ajax("api/users/userInfo",query,"get")
//5) 添加收藏
export const addcollect=(query)=>ajax("api/users/addCollect",query,"post")
//6) 删除收藏
export const delcollect=(query)=>ajax("api/users/deleteCollect",query,"post")
//6) 删除购物车商品
export const deletecart=(query)=>ajax("api/users/deleteCart",query,"post")
//7) 订单
export const getuserorder = (query) => ajax("api/users/getOrder",query,'get')
//7) 获取用户地址
export const getuseradress = (query) => ajax("api/users/getAdress",query,'get')
//删除地址
export const deadress = (query) => ajax("api/users/deleteAdress",query,'post')
// 添加地址
export const addadress = (query) => ajax("api/users/addAdress",query,'post')
// 修改地址
export const edadress = (query) => ajax("api/users/editAdress",query,'post')
//  提交订单
export const suborder = (query) => ajax("api/users/submitOrder",query,'post')
//  支付
export const payor = (query) => ajax("api/users/pay",query,'post')

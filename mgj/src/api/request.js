//对ajax进行二次封装 的工具
// 对axios进行二次封装 工具
import axios from "axios"

//axios请求后台接口 配置代理  后端cors解决跨域 默认的请求后端网址

axios.defaults.baseURL ="http://localhost:3000/"
// 请求超时时间  请求一直请求不到怎么办?
axios.defaults.timeout=10000   
// post的请求头
axios.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded;charset=UTF-8'; 
// 配置请求拦截器 request    过滤掉一些特殊的字符串等等
axios.interceptors.request.use((config)=>{
    let token = window.localStorage.getItem("my-token")
    if(token){
        config.headers['authorization'] = 'bearer ' + token  
    }
    //配置一堆东西 
    //console.log(config)
    return config
},(error)=>{
    return Promise.error(error)  //错误返回
})


//声明一个方法 ajax 只负责发送请求
export  default function ajax(url="",params={},type="GET"){
    let promise;

    return new Promise((resolve,reject)=>{
        if(type.toUpperCase()==="GET"){
            promise = axios({
                url,
                params
            })
        }else if(type.toUpperCase()==="POST"){
            promise = axios({
                method:"post",
                url,
                data:params
            })
        }
        promise.then((response)=>{
            resolve(response)
        }).catch((error)=>{
            reject(error)
        })
    })
}

// 配置响应拦截器 response   响应数据处理
axios.interceptors.response.use((response)=>{
    if(response.status===200){
        return Promise.resolve(response)   
    }else{
        return Promise.reject(response)    
    }
},(error)=>{
    console.log(error)
})
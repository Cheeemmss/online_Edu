import axios from 'axios'
import router from '@/router';
import ElementUI from 'element-ui';


const request = axios.create({
	baseURL: 'http://localhost:63010/',
    timeout: 20000  //部分文件上传请求(合并分片)可能比较耗时
})

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8';
    let user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    if(user != null){
       config.headers['token'] = user.token
    }
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return response //返回本来的response(需要拿响应头的信息)
        }
        
        //若登录过期了(token过期)
        if(res.code == 401){
            ElementUI.Message(
                {
                    message : '请先登录',
                    type : 'error'
                }
            )
           router.push('/login')
        }
        return res;
    },
    error => {
        console.log('err' + error) 
        return Promise.reject(error)
    }
)


export default request
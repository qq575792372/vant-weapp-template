import request from '../libs/request.js'
import env from '../env/index.js'

/* 创建request实例 */
const service = request.create({
  baseURL: env.BASE_URL, // 可以使用环境变量的服务地址
  // baseURL: 'http://localhost:8080',  // 也可以自定义服务地址
})

/* request拦截 */
service.interceptors.request.use(config => {
  // 设置请求头
  config.header['token'] = 1234;
  config.header['sessionid'] = 888;
  // 设置请求头，不设置情况下默认是body传参，而且代码http调用设置的会覆盖掉默认相同属性的header
  config.header['content-type'] = 'application/json;charset=utf-8;';
  console.log('request-config：', config); // 不想打印可以注释掉
  // 如果要执行请求前拦截，使用return false;
  return config;
}, error => {
  // 捕捉request异常
  console.error('request-error', error)
  return Promise.reject(error);
})

/* response拦截 */
service.interceptors.response.use(response => {
  console.log('response-success：', response); // 不想打印可以注释掉
  const res = response.data;
  if (res) {
    // 这里可以做点什么，比如通过返回的code判断登录是否过期
    // 返回请求的结果
    return res;
  } else {
    return Promise.reject(new Error(res.message || 'Error'))
  }
}, error => {
  // 捕捉response异常
  console.error('response-error：', error);
  wx.showToast({
    icon: 'none',
    title: '程序异常',
  });
  return Promise.reject(error);
})

/* 导出 */
export default service;
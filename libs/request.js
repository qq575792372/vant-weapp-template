/*
 * 功能：小程序仿axios的请求封装
 *
 * 创建日期：2019-12-23
 * 更新日期：2020-9-6
 * 作者：GaoShiWei
 */
export default class Request {
  // 配置项
  configure = {
    baseURL: '', // 请求的服务器地址，例如：http://xxx.com
    apiURL: '', // 请求的api接口地址，例如：/api/getUser
    requestUrl: '', // 请求接口的全路径，例如：http://xxx.com/api/getUser
    header: {
      'content-type': 'application/json;charset=utf-8;'
    }, // 请求的header，默认是body传参，可以在调用方法里指定不同的header，且会覆盖掉默认相同属性的header
    method: 'GET', // 请求的类型，支持get，post，put，delete，head，options，trace，connect
    dataType: 'json', // 返回的数据格式，默认json
    responseType: 'text', // 响应的数据格式，默认text
    data: {}, // 请求传参数据
    timeout: 3 * 60 * 1000, // 请求超时时间，默认3分钟，还未实现
    requestTask: null, // 请求任务，可以手动调用http.abort()取消本次请求
  }

  // 拦截器
  interceptors = {
    request: {
      use: (configCb, errorCb) => {
        if (configCb) this.interceptors.request.success = configCb;
        if (errorCb) this.interceptors.request.error = errorCb;
      },
      success: (successCb => successCb),
      error: (errorCb => errorCb),
    },
    response: {
      use: (successCb, errorCb) => {
        if (successCb) this.interceptors.response.success = successCb;
        if (errorCb) this.interceptors.response.error = errorCb;
      },
      success: (successCb => successCb),
      error: (errorCb => errorCb),
    }
  }

  // 构造器
  constructor(props) {
    this.configure = Object.assign({}, this.configure, props);
    this.requestTask = null; // 取消请求
  }

  // 提供create方法注入参数
  static create(configure = {}) {
    return new this(configure);
  }

  // 支持以下http请求方式，如果修改请求类型，在调用时候设置header的content-type覆盖全局配置即可
  get(url, data = {}, header = {}) {
    return this.request('GET', url, data, header);
  }
  post(url, data = {}, header = {}) {
    return this.request('POST', url, data, header);
  }
  put(url, data = {}, header = {}) {
    return this.request('PUT', url, data, header);
  }
  delete(url, data = {}, header = {}) {
    return this.request('DELETE', url, data, header);
  }
  head(url, data = {}, header = {}) {
    return this.request('HEAD', url, data, header);
  }
  options(url, data = {}, header = {}) {
    return this.request('OPTIONS', url, data, header);
  }
  trace(url, data = {}, header = {}) {
    return this.request('TRACE', url, data, header);
  }
  connect(url, data = {}, header = {}) {
    return this.request('CONNECT', url, data, header);
  }
  // 判断传参的api路径中的url是否带有http或者https前缀，有则不会拼加环境变量中的baseURL，直接会请求api中的地址
  isProtocolApiUrl(url) {
    return /(http|https):\/\/([\w.]+\/?)\S*/.test(url);
  }
  // request封装
  request(method = '', url = '', data = {}, header = {}) {
    // 设置配置参数
    this.configure.method = method;
    this.configure.apiURL = url;
    this.configure.requestUrl = this.isProtocolApiUrl(url) ? url : (this.configure.baseURL + url);
    this.configure.data = data;

    // Promise请求
    return new Promise((resolve, reject) => {
      // request拦截器没有return config或者return true，则不执行请求，抛出异常
      const before = this.interceptors.request.success(this.configure);
      if (!before) {
        this.interceptors.request.error({
          errMsg: "request:fail request interceptors,must be return data!"
        });
        reject({
          errMsg: "request:fail request interceptors,must be return data!"
        });
        return;
      };

      // 合并请求拦截器和http代码调用的header，以代码里调用http的优先级最高，拦截器里相同属性的会被覆盖掉
      this.configure.header = {
        ...this.configure.header,
        ...header
      };

      // 调用小程序的wx.request()
      this.requestTask = wx.request({
        url: this.configure.requestUrl,
        data: this.configure.data,
        header: this.configure.header,
        dataType: this.configure.dataType || 'json',
        responseType: this.configure.responseType || 'text',
        method: this.configure.method,
        success: (res) => {
          // 返回成功回调
          if (res && res.statusCode == 200) {
            // 调用response拦截器，返回数据结果到promise中
            const response = this.interceptors.response.success(res);
            resolve(response);
          } else {
            // 返回失败回调
            // 调用response拦截器，返回数据结果到promise中
            const response = this.interceptors.response.error(res);
            reject(response);
          }
        },
        fail: (err) => {
          // 返回失败回调
          // 调用response拦截器，返回数据结果到promise中
          const response = this.interceptors.response.error(err);
          reject(response);
        }
      })
    })
  }

  // 取消请求
  abort() {
    if (this.requestTask) {
      this.requestTask.abort();
    }
  }
}
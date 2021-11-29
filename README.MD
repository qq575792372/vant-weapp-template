## 一、使用步骤

```
1.npm install 安装依赖包
2.开发工具右上角点击：详情按钮》本地设置，勾选【使用npm模块】
2.在微信开发工具的菜单栏选择：工具》构建npm， 等待提示构建完成，点击重新编译。
3.如果控制台出现报错失败，找不到vant组件，点击开发工具清理所有缓存，点击重新编译。
```

## 二、目录说明
```
assets                #主要存放图片，自定义目录区分
  --home              #home需要的图片资源
components            #组件，自定义目录区分
templates             #模板文件，自定义目录区分
env                   #连接环境
  --index.js          #配置文件，连接后台环境，比如设置：SET_ENV='local'
libs                  #引入第三方的包，js
  --request.js        #小程序仿 axios 的请求封装
  --md5.js            #md5封装
pages                 #小程序源码目录
styles                #自定义的样式文件
  --index.wxss        #常用的一些样式
utils                 #工具包
  --http.js           #封装request.js的调用方法，可以设置全局拦截器
  --util.js           #封装的js工具类
app.js                #小程序入口js文件
app.json              #小程序全局配置文件
app.wxss              #小程序全局样式文件
package.json          #npm构建使用package.json
project.config.json   #项目配置
README.MD             #介绍小程序集成框架使用方法
```
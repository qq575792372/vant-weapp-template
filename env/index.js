// 连接后台环境，切换环境需要更改该参数
const SET_ENV = "local"

// 环境配置
const ENV_CONFIG = {
  // 本地环境
  local: {
    BASE_URL: "https://www.fastmock.site/mock/7a7e1ebfdb22dc583915c28c21f67d06",
    APPID: "wxbef61728f6bee6b0",
    APP_SECRET: "643cc852782efefcf518ea9fb9b10a48"
  },

  // 开发环境
  dev: {
    BASE_URL: "http://localhost:8080",
    APPID: "wxbef61728f6bee6b0",
    APP_SECRET: "643cc852782efefcf518ea9fb9b10a48"
  },

  // 预发布环境
  pre: {
    BASE_URL: "http://localhost:8080",
    APPID: "wxbef61728f6bee6b0",
    APP_SECRET: "643cc852782efefcf518ea9fb9b10a48"
  },

  // 线上环境
  pro: {
    BASE_URL: "http://localhost:8080",
    APPID: "wxbef61728f6bee6b0",
    APP_SECRET: "643cc852782efefcf518ea9fb9b10a48"
  },
}

// 导出环境配置
export default ENV_CONFIG[SET_ENV]
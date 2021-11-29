// 引入js
import http from '../../utils/http.js'
import util from '../../utils/util.js'

// 全局app
const app = getApp()

// page
Page({

	/**
	 * 页面的初始数据
	 */
  data: {},

	/**
	 * 生命周期函数
	 */
  onLoad(options) {
    this.queryList()
  },
  onShow() { },

  /**
   * 查询数据
   */
  queryList() {
    http.post('/api/queryList', {}).then(res => {
      // do success
    }).catch(error => {
      // do error
    })
  },
})
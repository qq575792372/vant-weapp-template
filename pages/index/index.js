import http from '../../utils/http.js'
import util from '../../utils/util.js';
import Dialog from '@vant/weapp/dialog/dialog';

// page
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // 列表分页查询
    list: [],
    listLoading: false, // 是否显示加载中
    totalPage: 0, // 分页的总页数
    loadMore: false, // 是否现实加载更多
    // 查询条件
    listQuery: {
      name: '',
      pageNo: 1,
      pageSize: 10
    }
  },

  /**
   * 生命周期函数
   */
  onLoad() {
    // 列表分页查询，演示取消请求
    // this.queryListForAbort();
    // 列表分页，正常查询
    this.queryList();
  },
  onShow() {},

  /**
   * 列表分页查询，演示取消请求
   */
  queryListForAbort() {
    http.post('/api/user/getList', {
      name: util.trimAll('小明 ')
    }).then(res => {

      console.log('查询列表成功：', res.data);
      this.setData({
        list: this.data.list.concat(res.data.data)
      })
    }).catch(error => {
      console.log('查询列表失败：', error);
    })
    // 可以调用http的abort方法取消本次请求
    http.abort();
  },
  /**
   * 列表分页，正常查询
   */
  queryList() {
    http.post('/api/user/getList', {
      name: util.trimAll('小明 ')
    }, {
      sessionid: 666,
    }).then(res => {
      console.log('查询到的信息：', res)
      this.setData({
        list: this.data.list.concat(res.data)
      })
    }).catch(error => {
      // console.log('查询列表失败：', error);
    })
  },
  /**
   * 重置列表分页查询
   */
  resetQueryList() {
    this.setData({
      list: [],
      totalPage: 0,
      loadMore: false,
      "listQuery.name": '',
      "listQuery.pageNo": 1,
      "listQuery.pageSize": 10,
    })
  },
  /*,*
   * 查看详情
   */
  getDetail() {},
  /**
   * 删除操作
   */
  handleDelete() {},
  /**
   * 确认修改
   */
  handleEditSubmit() {},

  /**
   * 展示vantage的弹框
   */
  showDialog() {
    Dialog.confirm({
      title: '标题',
      message: '弹窗内容'
    }).then(() => {
      // on confirm
    }).catch(() => {
      // on cancel
    });
  }
})
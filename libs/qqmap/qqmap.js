/*
 * 功能：小程序定位处理工具类
 *
 * 创建日期：2019-12-27
 * 更新日期：2019-12-27
 * 作者：GaoShiWei
 */
const QQ_MAP_SDK = require('./qqmap-wx-jssdk.min.js')
const MAP_SDK = new QQ_MAP_SDK({
  key: 'SA5BZ-LCDK3-OGY3F-YRBM2-UBQRZ-JRFX2' // 必填，目前是个人申请的，这里最好填自己申请的
})
// 导出
export default {
  /**
   * 获得当前定位信息
   */
  getLocation() {
    return new Promise(function (resolve, reject) {
      wx.getLocation({
        type: "wgs84",
        altitude: true,
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },
  /**
   * 地址转地图经纬度坐标
   * @param {String} address 地址
   */
  addressToLocation(address) {
    return new Promise(function (resolve, reject) {
      MAP_SDK.geocoder({
        address: address,
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },
  /**
   * 经纬度坐标转地址
   * 
   * @param {Float} latitude 维度
   * @param {Float} longitude 经度
   */
  locationToAddress(latitude, longitude) {
    return new Promise(function (resolve, reject) {
      MAP_SDK.reverseGeocoder({
        location: {
          latitude: latitude,
          longitude: longitude
        },
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },
  /**
   * 计算开始位置距离结束位置的距离，单位米
   * @param {Location} from 开始距离的经纬度，传入 string格式的 from:"39.984060,116.307520" 或者Object格式的 from:{latitude:39.984060, longitude:116.307520} ，默认不传是获取当前的位置
   * @param {*} to 结束距离的经纬度，传入String数组 to:"39.984060,116.307520;39.984060,116.507520" 或者传入数组对象 to:[{latitude:latitude:39.984060, longitude:116.307520}]
   */
  getLocationDistance(from, to) {
    return new Promise(function (resolve, reject) {
      MAP_SDK.calculateDistance({
        from: from,
        mode: "walking",
        to: to,
        success: res => {
          resolve(res);
        },
        fail: res => {
          reject(res);
        }
      })
    })
  },
}
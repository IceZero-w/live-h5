export default {
  // 获取页面参数
  getUrlParams(key) {
    let paramsStr = '';
    const obj = {};
    if (location.href.indexOf('?') > -1) {
      paramsStr = location.href.split('?')[1];
      const paramsList = paramsStr.split('&');
      
      paramsList.forEach((paramsItem) => {
        obj[paramsItem.split('&')[0]] = paramsItem.split('&')[1];
      })
    }
    return obj[key];
  },
  // 格式化金额
  getPrice(val) {
    if (val === null || val === '') {
        return val;
    } else if (isNaN(val)) {
        return null;
    } else {
        return +((val / 100).toFixed(2));
    }
  },
}
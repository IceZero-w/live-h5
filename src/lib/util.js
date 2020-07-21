export default {
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
}
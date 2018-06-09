/** @ngInject */

function MyDataService($http, $log) {
  function _getData() {

    if (_isEmpty(_getFromLS())){
        return $http({
            method: 'GET',
            url: 'http://starlord.hackerearth.com/hackernews'
          })
          .then(function (resp) { 
            // $log.log(resp.data.slice(1));
            _storeData(resp.data.slice(1));
            return resp.data.slice(1);
          })
          .catch(function (err_resp) {
            $log.log(err_resp);
            return err_resp;
          });
    }
    else
        return Promise.resolve(_getFromLS());
  }
  function _isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }
  function _storeData(obj) {
    localStorage.setItem('NewsStoreApp', JSON.stringify(obj));
  }
  function _getFromLS() {
    let obj = JSON.parse(localStorage.getItem('NewsStoreApp'));
    return obj;
  }
  return {
    getData: _getData,
    storeDate: _storeData,
    getFromLS: _getFromLS
  }
}
module.exports = MyDataService;

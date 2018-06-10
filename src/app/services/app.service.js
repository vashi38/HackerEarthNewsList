const MyNews = require('../Claasses/news');
const MyLocalStore = require('../Claasses/localStoreObj');
/** @ngInject */
function ApplicationService($log, MyDataService, $filter) {
  let currentObj;
  let currentRange = {
    "From": 0,
    "To": 0,
    "pageNo": 0
  };
  let isFilterEnabled = false;
  let backupList;

  function _appInit() {
    currentRange.From = 0;
    currentRange.To = 9;
    currentRange.pageNo = 1;
    return MyDataService.getData().then(function (res) {
      // $log.log(res);
      currentObj = new MyLocalStore(Object.values(res).map(function (e) {
        return new MyNews(e);
      }));
      // return new MyLocalStore(currentObj).getData(currentRange.From, currentRange.To);
      return currentObj.getData(currentRange.From, currentRange.To);
    });
  }

  function _getCurrentRange() {
    return currentRange;
  }

  function _getCurrentObj() {
    return currentObj.getData(currentRange.From, currentRange.To);
  }

  function _navigate(dir) {
    if (dir === -1) {
      if (currentRange.pageNo === 1) {
        alert("Wrong Navigation");
      } else {
        currentRange.pageNo--;
        currentRange.From = (currentRange.From - 10) < 0 ? 0 : currentRange.From - 10;
        currentRange.To = currentRange.To - 10;
      }
    } else {
      if (currentRange.pageNo === 10) {
        alert("Wrong Navigation");
      } else {
        currentRange.pageNo++;
        currentRange.To = (currentRange.To + 10) > currentObj.data.length ?
          currentObj.data.length : currentRange.To + 10;
        currentRange.From = currentRange.From + 10;
      }
    }
    return currentObj.getData(currentRange.From, currentRange.To);
  }

  function _getFullList() {
    return currentObj.data;
  }

  function _getSortedList(val) {
    currentObj.data = $filter('orderBy')(currentObj.data, val);
    return currentObj.getData(currentRange.From, currentRange.To);
  }
  // function _enableFilter(searchStr) {
  // 	if(!isFilterEnabled){
  // 		isFilterEnabled = true;
  // 		backupList = new MyLocalStore(currentObj.data);
  // 	}
  // 	currentObj.data = $filter('filter')(currentObj.data, searchStr);
  // 	return currentObj.getData(currentRange.From, currentRange.To);
  // }
  // function _disableFilter() {
  // 	if(isFilterEnabled)
  // 	{
  // 		isFilterEnabled = false;
  // 		currentObj = new MyLocalStore(backupList.data);
  // 	}
  // 	return currentObj.getData(currentRange.From, currentRange.To);
  // }
  return {
    appInit: _appInit,
    getCurrentRange: _getCurrentRange,
    getCurrentObj: _getCurrentObj,
    navigate: _navigate,
    getFullList: _getFullList,
    getSortedList: _getSortedList
    // enableFilter: _enableFilter,
    // disableFilter: _disableFilter
  };
}

module.exports = ApplicationService;

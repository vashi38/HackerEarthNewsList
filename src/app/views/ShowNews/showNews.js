class showNewsController {
  /** @ngInject */
  constructor(ApplicationService, $log, $filter) {
    let vm = this;
    _init();
    vm.isFilterEnabled = false;
    function _init() {
      ApplicationService.appInit().then(
        function (respose) {
          vm.NewsList = respose;
          $log.log($filter('filter')(respose, 'go'));
        }
      );
      vm.currentPage = ApplicationService.getCurrentRange();

    }
    vm.navClickHandler = function (dir) {
      $log.log(dir);
      vm.NewsList = ApplicationService.navigate(dir);
      vm.currentPage = ApplicationService.getCurrentRange();
    }
    vm.searchHandler = function () {
        $log.log(vm.searchTxt);
      if (vm.searchTxt!= "" ){
        vm.isFilterEnabled = true;
        vm.NewsList = ApplicationService.getFullList();
      }
      else{
        vm.isFilterEnabled = false;
        vm.NewsList = ApplicationService.getCurrentObj();
      }
    }
    vm.radioHandler = function() {
        $log.log(vm.sortBy);
        // if(vm.sortBy && vm.order)
            vm.NewsList = ApplicationService.getSortedList(vm.order+''+vm.sortBy);
    }
  }
}

export const showNews = {
  template: require('./showNews.html'),
  controller: showNewsController
};

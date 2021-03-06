export default routesConfig;

/** @ngInject */
function routesConfig($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('!');
  $urlRouterProvider.otherwise('/showNews');

  $stateProvider
    .state('showNews', {
      url: '/showNews',
      component: 'showNews'
    });
}

import angular from 'angular';

import 'angular-ui-router';
import routesConfig from './routes';
import MyDataService from './app/services/data.service';
import ApplicationService from './app/services/app.service';

import {showNews} from './app/views/ShowNews/showNews';

import './index.scss';
import './app/views/ShowNews/showNews.scss';

angular
  .module('app', ['ui.router'])
  .component('showNews', showNews)
  .factory('MyDataService', MyDataService)
  .factory('ApplicationService', ApplicationService)
  .config(routesConfig);

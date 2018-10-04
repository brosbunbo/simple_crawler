(function () {
  var app = angular.module('crawler', [
    'blockUI'
  ]);

  app.config([
    'blockUIConfig',
    function(blockUIConfig) {
      blockUIConfig.autoBlock = false;
      blockUIConfig.message = 'Crawling books, please wait...';
    }
  ]);
})();

(function() {
  angular.module('crawler').component('appBody', {
    templateUrl: '/js/components/app-body/component.html',
    controller: [
      '$scope',
      '$http',
      'blockUI',
      function($scope, $http, blockUI) {
        var vm = this;

        vm.$onInit = onInit;
        vm.onCrawlStart = onCrawlStart;
        vm.onCrawlEnd = onCrawlEnd;
        vm.crawl = crawl;

        function onInit() {
          vm.page = null;
          vm.categoryId = null;

          vm.msg = null;
          vm.categories = window.categories;
          vm.books = [];

          if (window.isCrawlingBooks) {
            vm.onCrawlStart();
          }

          io.socket.on('crawl.start', vm.onCrawlStart);

          io.socket.on('crawl.end', vm.onCrawlEnd);
        }

        function onCrawlStart() {
          vm.msg = null;
          vm.books = [];
          blockUI.start();
        }

        function onCrawlEnd(books) {
          $scope.$apply(function() {
            vm.books = books;

            if (0 == vm.books.length) {
              vm.msg = 'There are no books to crawl.';
            } else {
              vm.msg = vm.books.length + ' books crawled.';
            }

            blockUI.stop();
          });
        }

        function crawl() {
          if (!vm.page) {
            alert('Invalid page number');
            return;
          }

          let params = {page: vm.page};
          if (vm.categoryId) {
            params.category = vm.categoryId;
          }

          $http({
            method: 'GET',
            url: '/api/crawl',
            params: params
          }).then(function(response) {

          }).catch(function(error) {

          });
        }
      }
    ]
  })
})();

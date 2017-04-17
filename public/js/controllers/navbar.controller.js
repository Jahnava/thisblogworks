(function() {
  angular.module('mymeanblog')
        .controller('NavbarController', NavbarController);

  NavbarController.$inject = ['$scope', 'UserService'];

  function NavbarController($scope, UserService){
    $scope.isLoggedIn = UserService.isLoggedIn;
  }

  $scope.hcpurl = 'https://devlearnportal.herokuapp.com';

$scope.linkModelFunc = function (url){
  console.log('link model function');
  $window.open(url);
};
}());

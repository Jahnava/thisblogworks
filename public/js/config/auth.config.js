(function() {
  angular.module('mymeanblog')
        .run(AuthConfig);

  AuthConfig.$inject = ['UserService', '$location', '$rootScope'];

  function AuthConfig(UserService, $location, $rootScope){
    $rootScope.$on('$routeChangeStart', function(event, nextRoute, currentRoute){
      if(nextRoute.restricted.access && !UserService.isLoggedIn()){
        $location.path('/');
      }
    });
  }
}());

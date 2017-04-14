(function() {
  angular.module('mymeanblog')
         .controller('ReadController', ReadController);

  ReadController.$inject = ['$scope', '$routeParams', 'PostService'];

  function ReadController($scope, $routeParams, PostService){
    populate();
    function populate(){
      var postId = $routeParams.postId;
      PostService.getOne(postId)
                 .then(function(response){
                    $scope.post = response.data.posts[0];
                 });
    }
  }
}());

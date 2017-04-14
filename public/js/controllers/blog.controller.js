(function() {
  angular.module('mymeanblog')
          .controller('BlogController', BlogController);

  BlogController.$inject = ['$scope', 'PostService'];

  function BlogController($scope, PostService){
    $scope.posts = []

    populateRandomPosts();
    function populateRandomPosts(){
      PostService.randomPosts(10)
                .then(function(response){
                  $scope.posts = response.data.posts;
                });
    }
  }
}());

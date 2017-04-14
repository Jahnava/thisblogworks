(function() {
  angular.module('mymeanblog')
        .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$scope', 'PostService', '$location'];

  function DashboardController($scope, PostService, $location){
      $scope.edit = edit;
      $scope.delete = deletePost;
      $scope.posts = []

      populatePosts();
      function populatePosts(){
        PostService.getAll()
                   .then(function(response){
                     $scope.posts = response.data.posts
                   })
                   .catch(function(err){
                     console.log(err);
                   });
      }
      function edit(post){
        var url = `/edit/${post._id}`;
        $location.path(url);
      }
      function deletePost(post){
        PostService.delete(post)
                   .then(populatePosts); //I did this because .then can run the next function
      }
  }
}());

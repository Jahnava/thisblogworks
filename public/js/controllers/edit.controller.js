(function() {
  angular.module('mymeanblog')
        .controller('EditController', EditController);

  EditController.$inject = ['$scope', '$routeParams', 'PostService', '$location'];

  function EditController($scope, $routeParams, PostService, $location){
    $scope.edit = edit;

    editInit();
    function editInit(){
      var id = $routeParams.postId;
      PostService.getOne(id)
                  .then(function(response){
                    $scope.post = response.data.posts[0];
                  })
                  .catch(function(){
                    console.log('errror');
                  });
    }
    function edit(post){
      PostService.update(post)
                .then(function(response){
                  $location.path('/dashboard');
                })
                .catch(function(err){
                  console.log(err);
                });
    }
  }

}());

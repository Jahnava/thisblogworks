(function() {
  angular.module('mymeanblog')
      .factory('PostService', PostService);

  PostService.$inject = ['$http', 'UserService'];

  function PostService($http, UserService){
    var base = '/posts';

    function getAll(){
      var options = {
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`
        }
      }
      return $http.get(base, options);
    }
    function getOne(id){
      var url = `${base}/${id}`;
      return $http.get(url);
    }
    function create(post){
      return $http.post(base, post);
    }
    function update(post){
      var url = `${base}/${post._id}`;
      var options = {
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`
        }
      }
      return $http.put(url, post, options)
                  .then(function(response){
                    console.log(response);
                  });
    }
    function deletePost(post){
      var url = `${base}/${post._id}`;
      var options = {
        headers: {
          Authorization: `Bearer ${UserService.getToken()}`
        }
      }
      return $http.delete(url, options);
    }

    function randomPosts(number){
      var url = `/posts/random/${number}`;
      return $http.get(url);
    }

    return {
      getAll: getAll,
      getOne: getOne,
      create: create,
      update: update,
      delete: deletePost,
      randomPosts: randomPosts
    }
  }
}());

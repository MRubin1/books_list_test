var app = angular.module('myApp', []);
app.controller('BookController', function($scope, $http) {
    $scope.searchQuery = '';
    $scope.favorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    $scope.currentPage = 1; 
    $scope.pageSize = 9;
    $scope.books = [];

    $scope.toggleFavorite = function(book) {
        book.isFavorite = !book.isFavorite; 
        
        $scope.favorites = $scope.books.filter(function(b) {
            return b.isFavorite;
        });
        var favoritesFromLocalStorage = localStorage.getItem('favoriteBooks');
        console.log('Favorites from localStorage😘😘😘:', JSON.parse(favoritesFromLocalStorage));
        localStorage.setItem('favoriteBooks', JSON.stringify($scope.favorites));
    };
    $scope.isFavorite = function(book) {
        return book.favorite || false;
    };
    $scope.searchBooks = function() {
        var startIndex = ($scope.currentPage - 1) * $scope.pageSize;
        var startIndex = ($scope.currentPage - 1) * $scope.pageSize;

        $http.get('https://www.googleapis.com/books/v1/volumes', {
            params: {
                q: $scope.searchQuery,
                startIndex: startIndex,
                maxResults: $scope.pageSize
            }
        }).then(function(response) {
            $scope.books = response.data.items || [];
        });
    };
    $scope.nextPage = function() {
        $scope.currentPage++;
        $scope.searchBooks();
    };

    $scope.previousPage = function() {
        if ($scope.currentPage > 1) {
            $scope.currentPage--;
            $scope.searchBooks();
        }
    };
  });
  app.factory('BookService', function($http) {
    var apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  
    return {
      fetchBooks: function(query) {
        return $http.get(apiUrl, { params: { q: query } });
      }
    };
  });
    
  
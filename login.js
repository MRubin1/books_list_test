angular.module('myApp', [])
    .controller('LoginController', ['$scope', '$window', function($scope, $window) {
        $scope.fakeLogin = function() {
            $window.location.href = 'serche-bar.html';
        };
    }]);

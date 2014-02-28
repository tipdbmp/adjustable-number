angular.module('app', ['adjustable-number'])
.controller('ctrl', function($scope)
{
    $scope.my = {};
    $scope.my.cookies_count;

    $scope.calories = function()
    {
        return $scope.my.cookies_count * 50;
    };

});

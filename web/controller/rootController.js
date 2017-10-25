angular.module('app')
	.controller('rootController', ['$rootScope', '$state', function ($rootScope,$state) {
		$rootScope.gopage = function(stateName, params) {
			$state.go(stateName, params);
		}
	}])
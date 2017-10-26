angular.module('app')
	.controller('loginController', ['$scope','$timeout','$state','utils','API', function ($scope, $timeout, $state, utils,API) {
		
		$scope.data = {
			email:'',
			pwd:''
		};

		$scope.login = function() {
			if (!vaildLogin()) {
				return;
			}
			utils.tips.showLoadTips();
			API.fetchPost('/login', $scope.data)
				.then( function (data) {
					console.log('login.data ==>', data);
					utils.tips.hideLoadTips();
					showTips(data.data.msg);
					$timeout(function() {
						$state.tips.close();
						$state.go('main.home');
					}, 3000);
				})
				.catch ( function (err) {
					console.log(err);
				})
		}

		function showTips (msg) {
			utils.tips.showTips(msg, $scope);
		}

		function vaildLogin() {
			if (!utils.validForm.isNotEmpty($scope.data.email)) {
				showTips('邮箱不能为空');
				return false;
			}	else if (!utils.validForm.isEmail($scope.data.email)) {
				showTips('邮箱格式不正确');
				return false;
			}

			if (!utils.validForm.isNotEmpty($scope.data.pwd)) {
				showTips('密码不能为空');
				return false;
			}	else if (!utils.validForm.isLength($scope.data.pwd, 8, 16)) {
				showTips('密码长度需要8-16');
				return false;
			}	else if (utils.validForm.isNotOnlyW($scope.data.pwd)) {
				showTips('密码只能下划线、字母和数字');
				return false;
			}
				return true;
		}
	}])
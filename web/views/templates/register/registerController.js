angular.module('app')
	.controller('registerController', ['$scope','$timeout','$state','utils','API', function ($scope, $timeout, $state, utils, API) {
		$scope.data = {
			email:'',
			phone:'',
			nickname:'',
			pwd:'',
			cpwd:''
		};

		$scope.register = function() {
			if (!vaildRegister()) {
				return;
			}

			
			utils.tips.showLoadTips();
			API.fetchPost('/register', $scope.data)
				.then(function (data) {
					console.log('data ==>', data);
					utils.tips.hideLoadTips();
					utils.tips.showTips(data.data.msg, $scope);
					$timeout(function () {
						$scope.tips.close();
						$state.go('login');
					}, 3000);

				})
				.catch(function (arr) {
					utils.tips.hideLoadTips();
					utils.tips.showTips(data.data.msg);
				})
		}

		function showTips (msg) {
			utils.tips.showTips(msg, $scope);
		}

		function vaildRegister () {
			console.log($scope.data);
			if (!utils.validForm.isNotEmpty($scope.data.email)) {
				showTips('邮箱不能为空');
				return false;
			} else if (!utils.validForm.isEmail($scope.data.email)) {
				showTips('邮箱格式不正确');
				return false;
			}

			if (utils.validForm.isNotEmpty($scope.data.phone)) {
				if (!utils.validForm.isPhone($scope.data.phone)) {
					showTips('手机格式不正确');
					return false;
				} 
			}

			if (!utils.validForm.isNotEmpty($scope.data.nickname)) {
				var time =  new Date().getTime().toString();
				$scope.data.nickname = time.slice(time.length - 8 );
			}	else {
				if (!utils.validForm.isLength($scope.data.nickname, 3, 8)) {
					showTips('昵称只能3-8位');
					return false;
				} if (utils.validForm.isNotOnlyW($scope.data.nickname)) {
					showTips('昵称只能是下划线、字母和数字');
					return false;
				}
			}

			if(!utils.validForm.isNotEmpty($scope.data.pwd)) {
				showTips('密码不能为空');
				return false;
			} else if (!utils.validForm.isLength($scope.data.pwd, 8, 16)) {
				showTips('密码只能8-16位');
				return false;
			} else if (utils.validForm.isNotOnlyW($scope.data.pwd)) {
				showTips('密码只能是下划线、字母和数字');
				return false;
			}

			if(!utils.validForm.isEqual($scope.data.pwd, $scope.data.cpwd)) {
				showTips('两次密码不一致');
				return false;
			}
			return true;	
		}
		
	}])
app.controller('myCtrl', function($scope, $http, $interval, $filter) {
	initApp($scope, $http)

	$scope.pageVar.pageName = 'page template'
	$scope.pageVar.pageParent = {}
	$scope.pageVar.pageParent.url = '/'
	$scope.pageVar.pageParent.params = function(){
		return "?tableId=" +
				$scope.request.parameters.jsonId +
				""
	}
	
})

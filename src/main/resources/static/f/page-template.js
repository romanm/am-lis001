app.controller('myCtrl', function($scope, $http, $interval, $filter) {
	initApp($scope, $http)

	$scope.app.pageName = 'page template'
	$scope.app.pageParent = {}
	$scope.app.pageParent.url = '/'
		$scope.app.pageParent.params = function(){
		return "?tableId=" +
		$scope.request.parameters.jsonId +
		""
	}
	
})

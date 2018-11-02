var app = angular.module('myApp', ['ngSanitize']);
var initApp = function($scope, $http){
	console.log('initApp')
	build_request($scope)
	exe_fn = new Exe_fn($scope, $http);
	
	$scope.app = {}
	$scope.app.colortheme = {}
	console.log($scope.app)
	$scope.app.colortheme.changeTheme = function(){
		this.theme = (this.theme == 'night')?'day':'night'
		var data = $scope.app.site_config
		data.colortheme
			= $scope.app.colortheme
		console.log(data)
		exe_fn.httpPost({ url:'/url_file_write',
			then_fn:function(response) {
				console.log(response.data)
			},
			data:data,
		})
	}
	
	exe_fn.httpGet({
		url:'/r/principal',
		then_fn:function(response){
			$scope.principal = response.data.m
			console.log($scope.principal)
			console.log(response.data)
			$scope.app.site_config
				= response.data.config
			if($scope.app.site_config)
				if($scope.app.site_config.colortheme){
					$scope.app.colortheme.theme
						= $scope.app.site_config.colortheme.theme
					console.log($scope.app.site_config.colortheme)
				}
		},
	})
	
	$scope.highlight = function(text, search){
		if (!text) return
		if (!search) return text;
		return (''+text).replace(new RegExp(search, 'gi'), '<span class="w3-yellow">$&</span>');
	}
}

function Exe_fn($scope, $http){
	this.httpGet=function(progr_am){
		if(progr_am.error_fn)
			$http
			.get(progr_am.url, {params:progr_am.params})
			.then(progr_am.then_fn, progr_am.error_fn)
		else
			$http
			.get(progr_am.url, {params:progr_am.params})
			.then(progr_am.then_fn)
	}
	this.httpPost=function(progr_am){
		if(progr_am.error_fn)
			$http.post(progr_am.url, progr_am.data)
			.then(progr_am.then_fn, progr_am.error_fn)
		else
			$http.post(progr_am.url, progr_am.data)
			.then(progr_am.then_fn)
	}
}

function build_request($scope){
	$scope.request={};
	console.log($scope.request)
	$scope.request.pathNameValue = window.location.pathname.split('.html')[0].split('/').reverse()[0]
//	console.log($scope.request.pathNameValue)
	$scope.request.parameters={};
	if(window.location.search.split('?')[1]){
		angular.forEach(window.location.search.split('?')[1].split('&'), function(value, index){
			var par = value.split("=");
			$scope.request.parameters[par[0]] = par[1];
		});
	}
}

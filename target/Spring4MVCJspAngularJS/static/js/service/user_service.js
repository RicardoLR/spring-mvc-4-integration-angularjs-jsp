'use strict';

// ==============================================
// ======    Si solo usaramos ngResource   ======
// ==============================================

/* ==============================================

	$resource(url, [paramDefaults], [actions], options);
 	
 	En este objeto de clase de recurso, los métodos siguientes están disponibles

'Get': {method: 'GET'},
'Guardar': {method: 'POST'},
'Query': {method: 'GET', isArray: true},
'Remove': {method: 'DELETE'}, // Preferible sobre el borrado debido a incompatibilidades de IE.
'Delete': {method: 'DELETE'}

NOTA: no hay soporte HTTP PUT en los métodos predeterminados, pero podemos agregarlo:


============================================== */

/*

App.factory('User', ['$resource', function ($resource) {
	//$resource() function returns an object of resource class
	return $resource(
			'http://localhost:8080/Spring4MVCAngularJSNgResourceExample/user/:id', 
			{id: '@id'},
			{
				update: {
					  method: 'PUT' // To send the HTTP Put request when calling this custom update method.
				}
				
			}
	);
}]);

*/



angular.module('myApp').factory('UserService', ['$http', '$q', function($http, $q){

	var REST_SERVICE_URI = 'http://localhost:8080/Spring4MVCJspAngularJS/user/';
	
	var factory = {
		fetchAllUsers: fetchAllUsers,
		createUser: createUser,
		updateUser: updateUser,
		deleteUser: deleteUser
	};

	return factory;


	function fetchAllUsers() {

		var mi_promesa = $q.defer();
		
		$http.get(REST_SERVICE_URI).then(
			
			function (response) {
				mi_promesa.resolve(response.data);
			},

			function(errResponse){
				console.error('Error while fetching Users');
				mi_promesa.reject(errResponse);
			}
		);
		
		return mi_promesa.promise;
	}

	function createUser(user) {
		
		var deferred = $q.defer();
		
		$http.post( REST_SERVICE_URI, user).then(
			function (response) {
				deferred.resolve(response.data);
			},
			function(errResponse){
				console.error('Error while creating User');
				deferred.reject(errResponse);
			}
		);

		return deferred.promise;
	}


	function updateUser(user, id) {
		
		var deferred = $q.defer();
		
		$http.put(REST_SERVICE_URI+id, user).then(
			function (response) {
				deferred.resolve(response.data);
			},
			function(errResponse){
				console.error('Error while updating User');
				deferred.reject(errResponse);
			}
		);
	
		return deferred.promise;
	}

	function deleteUser(id) {

		var deferred = $q.defer();
		
		$http.delete(REST_SERVICE_URI+id).then(

			function (response) {
				deferred.resolve(response.data);
			},
			function(errResponse){
				console.error('Error while deleting User');
				deferred.reject(errResponse);
			}
		);

		return deferred.promise;
	}

}]);

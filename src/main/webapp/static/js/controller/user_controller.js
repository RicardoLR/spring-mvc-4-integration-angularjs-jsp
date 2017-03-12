'use strict';

angular.module('myApp').controller('UserController', ['$scope', 'UserService', function($scope, UserService) {

	var self = this;
	
	self.user={id:null, username:'', address:'', email:''};
	self.users=[];

	self.submit = submit;
	self.edit = edit;
	self.remove = remove;
	self.reset = reset;
	
	fetchAllUsers();

	function fetchAllUsers(){
		console.error('user_controller, 	function fetchAllUsers()... ');

		UserService.fetchAllUsers().then(
			function(mi_objeto_devuelto) {
				self.users = mi_objeto_devuelto;
			},
			function(errResponse){
				console.error('Error while fetching Users');
			}
		);

	}


	function createUser(user){
		console.error('user_controller, 	function createUser()... ');

		/** OJO mi function .then(llama_de_nuevo_a_esta_function, function en caso de error */
		UserService.createUser(user).then(fetchAllUsers, function(errResponse){
			console.error('Error while creating User');
		});

	}

	function updateUser(user, id){

		UserService.updateUser(user, id).then(
			// Realiza funcion
			fetchAllUsers,
			// realiza funcion en caso de error
			function(errResponse){
				console.error('Error while updating User');
			}

		);

	}

	function deleteUser(id){

		UserService.deleteUser(id).then(
			fetchAllUsers,
			function(errResponse){
				console.error('Error while deleting User');
			}
		);
	
	}

	function submit() {
		
		if(self.user.id===null){
			console.log('Saving New User', self.user);
			createUser(self.user);
		}else{
		
			updateUser(self.user, self.user.id);
			console.log('User updated with id ', self.user.id);
		}
		
		reset();
	}

	function edit(id){
		console.error('user_controller, 	function edit(id)... ');
		console.log('id to be edited', id);
		for(var i = 0; i < self.users.length; i++){
			if(self.users[i].id === id) {
				self.user = angular.copy(self.users[i]);
				break;
			}
		}
	}

	function remove(id){
		console.error('user_controller, 	function remove(id)... ');
		console.log('id to be deleted', id);
		
		if(self.user.id === id) {//clean form if the user to be deleted is shown there.
			reset();
		}
		deleteUser(id);
	}


	/** Resetea mi myform en mi vista
	*/
	function reset(){
		console.error('user_controller, 	function reset()... ');

		self.user={id:null,username:'',address:'',email:''};
		$scope.myForm.$setPristine(); //reset Form
	}

}]);


/* ==================================================
	Si solo usaramos el servidor con ngRource

	usar el codigo de abajo:
================================================== */


/*
App.controller('UserController', ['$scope', 'User', function($scope, User) {
	var self = this;
	self.user= new User();

	self.users=[];
	  
	self.fetchAllUsers = function(){
	  self.users = User.query();
	};
	 
	self.createUser = function(){
	  self.user.$save(function(){
		  self.fetchAllUsers();
	  });
	};

	self.updateUser = function(){
	  self.user.$update(function(){
		  self.fetchAllUsers();
	  });
	};

	self.deleteUser = function(identity){
	 var user = User.get({id:identity}, function() {
		  user.$delete(function(){
			  console.log('Deleting user with id ', identity);
			  self.fetchAllUsers();
		  });
	 });
	};

	self.fetchAllUsers();

	self.submit = function() {
	  if(self.user.id==null){
		  console.log('Saving New User', self.user);    
		  self.createUser();
	  }else{
		  console.log('Upddating user with id ', self.user.id);
		  self.updateUser();
		  console.log('User updated with id ', self.user.id);
	  }
	  self.reset();
	};
	  
	self.edit = function(id){
	  console.log('id to be edited', id);
	  for(var i = 0; i < self.users.length; i++){
		  if(self.users[i].id === id) {
			 self.user = angular.copy(self.users[i]);
			 break;
		  }
	  }
	};
	  
	self.remove = function(id){
	  console.log('id to be deleted', id);
	  if(self.user.id === id) {//If it is the one shown on screen, reset screen
		 self.reset();
	  }
	  self.deleteUser(id);
	};


	self.reset = function(){
	  self.user= new User();
	  $scope.myForm.$setPristine(); //reset Form
	};

}]);
*/
 
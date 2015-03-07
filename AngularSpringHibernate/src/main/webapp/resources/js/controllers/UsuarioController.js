var UsuarioController = function($scope, $http) {

	$scope.editMode = false;
	$scope.position = '';
	$scope.add = "UsuarioController";
	
	$scope.getPersonDataFromServer = function() {
		$http.get('usuario/list.json')
		.success(function(data, status, headers, config) {
        	$scope.personDatas = data;	        	
        })
        .error(function(data, status, headers, config) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
        });		    
    };		
    

	$scope.list = function() {
		$http.get('usuario/list.json').success(function(response) {
			$scope.beanList = response;
			
		});
	};

	$scope.reset = function() {
		$scope.bean.correo = '';
		$scope.bean.nombre = '';
		$scope.editMode = false;
	};

	$scope.add = function(bean) {
		$http.post('usuario/add', bean).success(function(response) {
			$scope.list();
			$scope.bean.correo = '';
			$scope.bean.contrasena = '';
			console.log('Correcto' + bean);
			$scope.setSuccess('exito al grabar.');
		}).error(function(response) {
			console.log('Error' + response);
			$scope.setError('error al ADD');
		});
	};

	$scope.update = function(bean) {
		$http.post('usuario/update/', bean).success(
				function(response) {
					$scope.bean.correo = '';
					$scope.bean.nombre = '';
					$scope.list();
					$scope.editMode = false;
					$scope.setSuccess('exito al actualizar.');
				}).error(function(response) {
			console.log(response);
		});
	};

	$scope.delete = function(bean) {
		$http.post('usuario/delete', bean).success(function(response) {
			$scope.list();
			console.log('Correcto Eliminado' + bean.id);
			$scope.setSuccess('exito al borrar.');
		}).error(function(response) {
			console.log(response);
		});
	};

	$scope.set = function(pos, bean) {
		$scope.position = pos;
		$scope.bean = bean;
		$scope.editMode = true;
	};
	
	 $scope.resetError = function() {
	        $scope.error = false;
	        $scope.errorMessage = '';
	    };

	    $scope.setError = function(message) {
	        $scope.error = true;
	        $scope.success = false;
	        $scope.errorMessage = message;
	    };
	    
	    $scope.resetSuccess = function() {
	        $scope.success = false;
	        $scope.successMessage = '';
	    };

	    $scope.setSuccess = function(message) {
	        $scope.success = true;
	        $scope.error = false;
	        $scope.successMessage = message;
	    };
	    
	    

	$scope.list();
};
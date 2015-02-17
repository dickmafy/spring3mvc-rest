
var UsuarioController = function($scope, $http){

    $scope.editMode = false;
    $scope.position = '';

    $scope.viewAllAddressBook = function(){
        $http.get('usuario/all.json').success(function(response){
            $scope.addressBooks = response;
        });
    };

    $scope.resetAddressBookField = function(){
        $scope.ab.firstName='';
        $scope.ab.lastName='';
        $scope.ab.phone = '';
        $scope.ab.email = '';
        $scope.editMode = false;
    };

    $scope.addUsuario = function(ab) {
        $http.post('usuario/add', ab)
        .success(function(response){
            $scope.viewAllAddressBook();
            $scope.ab.correo='';
            $scope.ab.contrasena='';
            console.log('Correcto' + ab);
        }).error(function(response){
            console.log('Error' + response);
        });
    };

    $scope.updateAddressBook = function(ab) {
        $http.put('address/update/'+$scope.position, ab).success(function(response){
            $scope.ab.firstName='';
            $scope.ab.lastName='';
            $scope.ab.phone = '';
            $scope.ab.email = '';
            $scope.viewAllAddressBook();
            $scope.editMode = false;
        }).error(function(response){
            console.log(response);
        });
    };

    $scope.deleteUsuario = function(objeto) {
        $http.post('usuario/delete' ,objeto).success(function(response){
            $scope.viewAllAddressBook();
            console.log('Correcto Eliminado' + objeto.id);
        }).error(function(response){
            console.log(response);
        });
    };

    $scope.deleteAllAddressBook = function(){
        $http.delete('address/delete/all').success(function(response){
            $scope.viewAllAddressBook();
        });
    };

    $scope.editAddressBook = function(pos, addressBook){
        $scope.position = pos;
        $scope.ab = addressBook;
        $scope.editMode = true;
    };

    $scope.viewAllAddressBook();
};
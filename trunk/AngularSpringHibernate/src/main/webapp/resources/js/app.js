'use strict';

var AngularSpringApp = {};

var App = angular.module('AngularSpringApp', ['AngularSpringApp.filters', 'AngularSpringApp.services', 'AngularSpringApp.directives', 'ngRoute', 'ui.bootstrap', 'ngTable', 'ui.ace', 'angularFileUpload', 'nvd3ChartDirectives']);

// Declare app level module which depends on filters, and services
App.config(['$routeProvider', function ($routeProvider) {

    $routeProvider.when('/todo', {
        templateUrl: 'todo/layout',
        controller: TodoController
    });
    $routeProvider.when('/usuario', {
        templateUrl: 'usuario/layout',
        controller: UsuarioController
    });
    
    $routeProvider.otherwise({redirectTo: '/'});
}]);

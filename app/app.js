/* App Module */

'use strict';

define([
    'angular'
], function(angular) {
    // Declare app level module which depends on views, and components
    var widgetApp = angular.module('widgetApp', [
    	'ngAnimate',
    	'ui.router',
    	'ui.bootstrap',
        'ngStorage',
        'ngRoute',
        'chart.js',
        'monospaced.mousewheel',
        "widgetServices",
        "widgetDirectives",
        "widgetControllers",
        "widgetFilters",
        "widgetAnimations"
    ]).

    config(['$routeProvider', '$locationProvider', function($routeProvider , $locationProvider) {
        $routeProvider.when('/', {
                templateUrl: 'partials/main.html',
                controller: 'widgetCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
         // $locationProvider.html5Mode(true);
    }]).

    run(function($q, $http) {

    })
    return widgetApp
});

/* App Module */

'use strict';

var test;
define([
    'angular',
    "jqueryAppear",
    'angularAnimate',
    'angularRoute',
    'angularMousewheel',
    'hamsterjs',
    'angularChart',
    'angularAMD',
    'ngStorage',
    'angularBootstrap',
    'angularResource',
    'angularUIRouter',
    'smt',
    'perfectScrollbar',
    'perfectScrollbarJquery',
    // local files under baseUrl no need to load  in this case is ""
    'js/controllers',
    'js/animations',
    'js/services',
    'js/directives',
    'js/filters'
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
        // initial commonjs module
        window.PerfectScrollbar = require('perfectScrollbar');
        require('perfectScrollbarJquery');
    })
    return widgetApp
});


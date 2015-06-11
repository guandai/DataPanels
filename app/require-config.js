'use strict';

if (window.__karma__) {
    var allTestFiles = [];
    var TEST_REGEXP = /spec\.js$/;

    var pathToModule = function(path) {
        return path.replace(/^\/base\/app\//, '').replace(/\.js$/, '');
    };

    Object.keys(window.__karma__.files).forEach(function(file) {
        if (TEST_REGEXP.test(file)) {
            // Normalize paths to RequireJS module names.
            allTestFiles.push(pathToModule(file));
        }
    });
}

require.config({
    paths: {
        angular: 'bower_components/angular/angular',
        angularAMD: 'bower_components/angularAMD/angularAMD',
        angularCookies: 'bower_components/angular-cookies/angular-cookies',
        angularLoader: 'bower_components/angular-loader/angular-loader',
        angularMocks: 'bower_components/angular-mocks/angular-mocks',
        angularMousewheel: 'bower_components/angular-mousewheel/mousewheel',
        angularResource: 'bower_components/angular-resource/angular-resource',
        angularRoute: 'bower_components/angular-route/angular-route',
        angularBootstrap: 'bower_components/angular-bootstrap/ui-bootstrap',
        angularUIRouter: 'bower_components/angular-ui-router/release/angular-ui-router',
        chartjs: 'bower_components/Chart.js/Chart',
        angularChart: 'bower_components/angular-chart.js/angular-chart',
        // cant use .  when define paths name
        hamsterjs: 'bower_components/hamsterjs/hamster',
        jquery: 'bower_components/jquery/dist/jquery',
        ngStorage: 'bower_components/ngstorage/ngStorage',
        text: 'bower_components/requirejs-text/text',
        angularAnimate: 'bower_components/angular-animate/angular-animate.min',
        // must use 1.3
        //domReady: "bower_components/requirejs-domready/domready"
    },
    map : {
        "angularChart":{
        	"chart.js": "chartjs"
        }
    },
    shim: {
        'angular': {
            'exports': 'angular'
        },
        'angularRoute': ['angular'],
        'angularResource': ['angular'],
        'angularUIRouter': ['angular'],
        'angularMocks': {
            deps: ['angular'],
            'exports': 'angular.mock'
        },
        'angularBootstrap': ['angular'],
        'angularAnimate': ['angular'],
        'angularMousewheel': {
            deps: ['angular']
        }
    },
    priority: [
        "angular"
    ],
    deps: window.__karma__ ? allTestFiles : [],
    callback: window.__karma__ ? window.__karma__.start : null,
    baseUrl: window.__karma__ ? '/base/app' : '',
});

require([
   // 'domReady', 
    'angular',
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
    'jquery',
    // local files under baseUrl no need to load  in this case is ""
    
    'js/controllers',
    'js/animations',
    'js/services',
    'js/directives',
    'js/filters',
    'js/smt',
    'app'
], function(angular, app) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function() {
        // bootstrap the app manually
        angular.bootstrap(document, ['widgetApp']);
    });
});

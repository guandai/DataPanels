this.__karma__= window.__karma__;
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
        jquery: 'bower_components/jquery/dist/jquery',
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
        perfectScrollbarJquery: 'bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery',
        perfectScrollbar: 'bower_components/perfect-scrollbar/js/perfect-scrollbar',
        jqueryAppear: 'bower_components/jquery_appear/jquery.appear',
        smt: 'bower_components/smt/dist/smt',
        // cant use .  when define paths name
        hamsterjs: 'bower_components/hamsterjs/hamster',
        modenizr: "bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min",
        ngStorage: 'bower_components/ngstorage/ngStorage',
        text: 'bower_components/requirejs-text/text',
        angularAnimate: 'bower_components/angular-animate/angular-animate.min',
        // must use 1.3
        //domReady: "bower_components/requirejs-domready/domready"
    },
    map: {
        "angularChart": {
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
        'chartjs': {
            'exports': 'Chart'
        },
        'jqueryAppear': ['jquery'],
        'angularBootstrap': ['angular'],
        'angularAnimate': ['angular'],
        'angularMousewheel': {
            deps: ['angular']
        }
    },
    priority: [
        "angular"
    ],
    deps : this.__karma__ ? allTestFiles : [],
    callback : this.__karma__ ? this.__karma__.start : null,
    baseUrl : this.__karma__ ? '/base/app' : ''
});

require(["boot"]);

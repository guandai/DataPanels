/* global module */
"use strict";

module.exports = function(config){
  config.set({

    basePath : './',
 
    files : [
      {pattern: 'app/bower_components/angular/angular.js', included: false},
      {pattern: 'app/bower_components/angular-route/angular-route.js', included: false},
      {pattern: 'app/bower_components/angular-mocks/angular-mocks.js', included: false},
      {pattern: 'app/bower_components/hamsterjs/hamster.js', included: false},
      {pattern: 'app/bower_components/angular-chart.js/angular-chart.js', included: false},
      {pattern: 'app/bower_components/Chart.js/Chart.js', included: false},
      {pattern: 'app/bower_components/ngstorage/ngStorage.js', included: false},
      {pattern: 'app/bower_components/angular-mousewheel/mousewheel.js', included: false},
      {pattern: 'app/bower_components/angular-resource/angular-resource.js', included: false},
      {pattern: 'app/bower_components/angular-bootstrap/ui-bootstrap.js', included: false},
      {pattern: 'app/bower_components/angular-ui-router/release/angular-ui-router.js', included: false},
      {pattern: 'app/bower_components/jquery/dist/jquery.js', included: false},
      {pattern: 'app/bower_components/angular-animate/angular-animate.min.js', included: false},
      {pattern: 'app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js', included: false},
      {pattern: 'app/bower_components/perfect-scrollbar/js/perfect-scrollbar.js', included: false},
      {pattern: 'app/bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.js', included: false},
      {pattern: 'app/bower_components/jquery_appear/jquery.appear.js', included: false},
      {pattern: 'app/bower_components/angularAMD/angularAMD.js', included: false},
      {pattern: 'app/bower_components/angular-resource/angular-resource.js', included: false},
      {pattern: 'app/bower_components/smt/dist/smt.js', included: false},
      
      
      {pattern: 'app/bower_components/**/*.js', included: false},
      {pattern: 'app/js/**/*.js', included: false},

      {pattern: 'app/boot.js', included: false},
      // needs to be last http://karma-runner.github.io/0.12/plus/requirejs.html
      
      "app/require-config.js"
    ],

    autoWatch : true,

    frameworks: ['jasmine', 'requirejs'],

    browsers : ['Chrome'],

    plugins : [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-requirejs',
            'karma-junit-reporter'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }

  });
};

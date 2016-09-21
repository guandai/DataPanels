'use strict';

require([
   // 'domReady', 
    'jquery',
    'angular',
    'js/boot',
    "modenizr"
], function(  jquery, angular, app ) {
    
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function() {
        // bootstrap the app manually
        angular.bootstrap(document, ['widgetApp']);
    });
});
 

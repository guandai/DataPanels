
'use strict';

/* Directives */

var widgetDirectives = angular.module('widgetDirectives',[]);

widgetDirectives.directive("sharePanel" , function(){    
       return {
        restrict: 'EAC',
        transclude: true,
        templateUrl: './partials/sharepanel.html'
      };
})

widgetDirectives.directive("switchCharts" , function(){
   return {
    restrict: 'EAC',
    template: '<ng-include  class="template-include"  src="switchTemplate()"/>',
    transclude: true,
    link : function(scope,element,attrs, ctrl) {
             tr("template: ",attrs.template)             
             scope.switchTemplate = function(){
                     return attrs.template
                 }
            }
    };
})

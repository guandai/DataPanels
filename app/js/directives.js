'use strict';
/* Directives */
var widgetDirectives = angular.module('widgetDirectives', []);
widgetDirectives.directive("sharePanelWrap", function() {
    return {
        restrict: 'EAC',
        transclude: true,
        templateUrl: './partials/sharepanel.html'
    };
})
widgetDirectives.directive("switchPanel", function() {
    return {
        restrict: 'EAC',
        template: '<ng-include  class="template-include"  src="switchTemplate()"/>',
        transclude: true,
        link: function(scope, element, attrs, ctrl) {
            tr("template: ", attrs.template)
            scope.switchTemplate = function() {
                return attrs.template
            }

        }
    };
})


widgetDirectives.directive("reviewListRepeat", ['$animate', '$compile', "value", "smt", function($animate, $compile, value, smt) {
    return {
        link: function(scope, element, attrs) {
           var sr =  scope.review
           var prattr=element.parent()[0].attributes["ng-repeat"].value.match(/[\s\,\[]?(\w*)\Scope.reviews/)[1]  
           var offset =0
           if(prattr == "vertical" ) offset = 68
           if(prattr == "horizontal" ) offset = 51

           scope.$watch(function(scope) {

                    return sr.showall
                },

                function(showall, oldshowall) {

                    sr.showalltext = "more"
                    sr.dist = smt.getint(element.css("height")) - value.reviewHeight + offset   // no style it is 51  or 68
                    sr.buttonshow =  sr.dist > 0;
                    
                      //if(sr.id==4){
                       // tr(smt.getint(element.css("height")) , value.reviewHeight)
                        //tr(sr.dist)
                    //}


                    if (showall) {
                        sr.buttonshow = true;
                        sr.showalltext = "less"
                        sr.showclass = "showmore-" + prattr

                        if(prattr == "vertical" ){
                            var orgclass =  element.parent().parent().css("top")
                            var newclass =  smt.getint(orgclass) - value.reviewHeight + "px"
                            $animate.animate( element.parent().parent() , { "top":orgclass} , {"top":newclass} ,"transitionDef" );
                        }
                        if(prattr == "horizontal" ){
                            var orgclass =  element.parent().parent().css("left")
                            var newclass =  smt.getint(orgclass) - value.reviewWidth/2 + "px"
                            $animate.animate( element.parent().parent() , { "left":orgclass} , {"left":newclass} ,"transitionDef" );   
                        }

                    }
                    if (!showall && oldshowall) {
                        sr.showclass = "showless-" + prattr
                        
                        if(prattr == "vertical" ){
                            var orgclass =  element.parent().parent().css("top")
                            var newclass =  smt.getint(orgclass) + sr.dist + "px"
                            $animate.animate( element.parent().parent() , { "top":orgclass} , {"top":newclass} ,"transitionDef" );
                        }
                        if(prattr == "horizontal" ){
                            var orgclass =  element.parent().parent().css("left")
                            var newclass =  smt.getint(orgclass) + value.reviewMaxWidth - value.reviewWidth *1.5 + "px"
                            $animate.animate( element.parent().parent() , { "left":orgclass} , {"left":newclass} ,"transitionDef" );   
                        }
                    }
                });
        }   
            
    };
}])

  
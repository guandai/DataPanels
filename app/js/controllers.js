'use strict';
/* Controllers */

var widgetControllers = angular.module('widgetControllers', []);
var test

widgetControllers.controller('widgetCtrl', ['$scope', 'Review', 'Widget', 'Email', '$localStorage', 'smt', 'value',

    function($scope, Review, Widget, Email, $localStorage, smt, value) {
        test = $scope

        $scope.widgetScope = Widget.scope;
        $scope.reviewScope = Review.scope;
        $scope.emailScope = Email.scope;
        $scope.series = ["Sent","Received", "Reply","Received in %","Reply in %"]

        //  set default localStroage
        $localStorage.$reset()
        if ($localStorage.widgets) {
            $scope.$storage = $localStorage
        }

        $scope.$watch(
            function($scope) {
                if ($scope.widgetScope.widgets) {
                    if ($scope.$storage) {
                        //tr("Use $scope.$storage")
                        $localStorage.widgets = $scope.$storage.widgets
                    } else {
                        //tr("No $scope.$storage")
                        $scope.$storage = {
                            "widgets": $scope.widgetScope.widgets
                        }
                    }
                } else {
                    //tr("$scope.widgetScope.widgets not ready")
                }
            },
            function(value) {}
        )

        $scope.check = function(id) {
            if ($scope.widgetScope.widgets) {
                if ($scope.$storage.widgets) {
                    // tr("Use $scope.$storage.widgets")
                    enmuobj($scope.$storage.widgets, "id", id, function(scope, index) {
                        scope[index].checked = !scope[index].checked;
                    })
                } else {
                    //tr("No $scope.$storage.widgets")
                    enmuobj($scope.widgetScope.widgets, "id", id, function(scope, index) {
                        scope[index].checked = !scope[index].checked;
                    })
                }
            }
        };

        $scope.showupfn = function(scope, element) {
            var heightint = smt.getcssint(element, ".review-list", "height") // total height
            var topint = smt.getcssint(element, ".review-list", "top") // position
            var listheight = smt.getcssint(element, ".review-list-wrap", "height") // window height
                //    tr(heightint,topint,listheight,"topint > -heightint + listheight",topint > -heightint + listheight)
            if (topint > -heightint + listheight / 2) {
                scope.aniclass = "slideup";
            }
        }

        $scope.showdownfn = function(scope, element) {
            //tr("showdown")
            var topint = smt.getcssint(element, ".review-list", "top")
                // tr(topint,"topint < 0",topint < 0)
            if (topint <= -value.reviewHeight) {
                scope.aniclass = "slidedown";
            }
        }

        $scope.showleftfn = function(scope, element) {
            var widthint = smt.getcssint(element, ".review-list", "width") // total width
            var leftint = smt.getcssint(element, ".review-list", "left") // position
            var listwidth = smt.getcssint(element, ".review-list-wrap", "width") // window width
            if (leftint > -widthint + listwidth / 2) {
                scope.aniclass = "slideleft";
            }
        }

        $scope.showrightfn = function(scope, element) {
            var leftint = smt.getcssint(element, ".review-list", "left")
            if (leftint <= -value.reviewWidth) {
                scope.aniclass = "slideright";
            }
        }
    }
]);






widgetControllers.controller("VerticalCtrl", ['$scope', '$element', 'smt', 'value' ,function($scope, $element, smt , value) {

    var verticalScope = $scope.verticalScope = angular.copy($scope.reviewScope)

    verticalScope.mousewheelVerti = function(event, delta) {
        event.preventDefault();
        var target = $("#mousewheelVerti")
        var orgInt = smt.getint( target.css("top") ) 
        var orgProp = smt.getint( target.css("height") ) 
        var wrapProp = smt.getint( target.parent().css("height") ) 

        
      //  tr(event.target, target, orgInt, orgProp , wrapProp)
        if(event.target.className.match("reviewBody") ){
            var buttonshow = smt.getScope(event.target).review.buttonshow 
        }

        if (delta) {
                var newInt = orgInt + delta 
                if (newInt>0) newInt = 0
                var btmoffset = 50
                if (newInt < -orgProp + wrapProp -btmoffset) newInt = -orgProp+wrapProp-btmoffset
                target.css("top", newInt + "px") 
            
        }
    }


    verticalScope.showup = function() {
        $scope.showupfn($scope.verticalScope, $element)
    }

    verticalScope.showdown = function() {
        $scope.showdownfn($scope.verticalScope, $element)
    }


}]);






widgetControllers.controller("HorizontalCtrl", ['$scope', '$element', 'smt', 'value' ,function($scope, $element, smt , value) {

    var horizontalScope = $scope.horizontalScope = angular.copy($scope.reviewScope)
    
    $element.parent().parent().parent().css("background-color",$element.css("background-color")).css("color",$element.css("color"))
    horizontalScope.mousewheel = function(event, delta) {
    	var orgint = smt.getint( $(event.target).css("top") ) 
        var orgheight = smt.getint( $(event.target).css("height") ) 
        var wrapheight = smt.getint( $(event.target).parent().css("height") ) 
        var buttonshow = smt.getScope(event.target).review.buttonshow 
        if (delta && buttonshow) {
                var newint = orgint + delta 
                if (newint>0) newint = 0
                if (newint < -orgheight+wrapheight) newint = -orgheight+wrapheight
                $(event.target).css("top", newint + "px") 
            
        }
        event.preventDefault();
    }

    horizontalScope.mousewheelHori = function(event, delta) {
    	
    	var target = $("#mousewheelHori")
    	var orgInt = smt.getint( target.css("left") ) 
        var orgProp = smt.getint( target.css("width") ) 
        var wrapProp = smt.getint( target.parent().css("width") ) 

      //  tr(event.target, target, orgInt, orgProp , wrapProp)
		if(event.target.className.match("reviewBody") ){
			var buttonshow = smt.getScope(event.target).review.buttonshow 
		}

        if (delta &&  !buttonshow  ) {
                var newInt = orgInt + delta 
                if (newInt>0) newInt = 0
                if (newInt < -orgProp+wrapProp) newInt = -orgProp+wrapProp
                target.css("left", newInt + "px") 
        }
        event.preventDefault();
    }


    horizontalScope.showleft = function() {
        $scope.showleftfn($scope.horizontalScope, $element)
    }

    horizontalScope.showright = function() {
        $scope.showrightfn($scope.horizontalScope, $element)
    }

}]);





widgetControllers.controller("TableCtrl",  function ($scope) {
});

widgetControllers.controller("DayLineCtrl",  function ($scope) {
  
  $scope.series  = $scope.series.slice(0,3)
  $scope.emailScope.lastdays = 15
  

  // slice day data depence how many last day choosed
  updateLineData()
  function updateLineData(){
        $scope.emailScope.dayDataLine = []
        var skipline = osize($scope.emailScope.dayData) -  $scope.emailScope.lastdays
        $scope.emailScope.dayLabelsCut=  $scope.emailScope.dayLabels.slice( skipline )

        for (var i in $scope.emailScope.dayDataRev ){
            if( i !="receivedPer" && i !="replyPer" ){
                var d = joinAsArray($scope.emailScope.dayDataRev[i]).slice(skipline)            
                $scope.emailScope.dayDataLine.push(d)   
            }
        }  
  }
    //  add update button
  $scope.$watch($scope.lastdays)
    if(document.getElementById("updateLineButton")) {
        document.getElementById("updateLineButton")
        .addEventListener('click', function() {
            $scope.lastdays=parseInt($scope.lastdays)
            tr("updated",$scope.emailScope.lastdays )
            $scope.$apply( updateLineData );
        });         
    }
  
});

widgetControllers.controller("MonthBarCtrl", function ($scope) {
    $scope.emailScope.monthDataBar = []
    $scope.series  = $scope.series.slice(0,3)
    for (var i in $scope.emailScope.monthDataRev ){
        if( i !="receivedPer" && i !="replyPer" ){
            var d = joinAsArray($scope.emailScope.monthDataRev[i])
            $scope.emailScope.monthDataBar.push(d)  
        }
    }  
});

widgetControllers.controller("YearBarCtrl",   function ($scope) {
    $scope.emailScope.yearDataBar = []
    $scope.series  = $scope.series.slice(0,3)
    for (var i in $scope.emailScope.yearDataRev ){
        if( i !="receivedPer" && i !="replyPer" ){
            var d = joinAsArray($scope.emailScope.yearDataRev[i])
            $scope.emailScope.yearDataBar.push(d)   
        }
        
    }  
});






'use strict';


/* Controllers */

var widgetControllers = angular.module('widgetControllers', []);
var test


widgetControllers.controller('widgetCtrl', ['$scope', 'Email', 'Widget', '$localStorage',
	function($scope , Email, Widget, $localStorage) {
	    test=$scope
	    $scope.series = ["Sent","Received", "Reply","Received in %","Reply in %"]
		$scope.widgetScope =  Widget.scope;
		$scope.emailScope=Email.scope;
		
		//  set default localStroage
		// $localStorage.$reset()
		if($localStorage.widgets){
			$scope.$storage=$localStorage
		}
		$scope.$watch( 
			function($scope){
				if($scope.widgetScope.widgets){
					if( $scope.$storage) {
						//tr("Use $scope.$storage")
						$localStorage.widgets = $scope.$storage.widgets
					}else{
						//tr("No $scope.$storage")
						$scope.$storage = { "widgets" : $scope.widgetScope.widgets } 
					}
				}else{
					//tr("$scope.widgetScope.widgets not ready")
				}
			}, 
			function(value){} 
		)

	    $scope.check = function (id) {
		       if($scope.widgetScope.widgets){
					if( $scope.$storage.widgets) {
						// tr("Use $scope.$storage.widgets")
					     enmuobj( $scope.$storage.widgets, "id", id, function(scope,index){
		         		 scope[index].checked = !scope[index].checked; })
					}else{
						//tr("No $scope.$storage.widgets")
						enmuobj( $scope.widgetScope.widgets, "id", id, function(scope,index){
		         		scope[index].checked = !scope[index].checked; })
					}
				}
		};
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
	if(document.getElementById("updateLineButton"))	{
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



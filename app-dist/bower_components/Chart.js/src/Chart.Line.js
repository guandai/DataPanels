(function(){"use strict";var root=this,Chart=root.Chart,helpers=Chart.helpers,defaultConfig={scaleShowGridLines:!0,scaleGridLineColor:"rgba(0,0,0,.05)",scaleGridLineWidth:1,scaleShowHorizontalLines:!0,scaleShowVerticalLines:!0,bezierCurve:!0,bezierCurveTension:.4,pointDot:!0,pointDotRadius:4,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'};Chart.Type.extend({name:"Line",defaults:defaultConfig,initialize:function(data){this.PointClass=Chart.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx,inRange:function(mouseX){return Math.pow(mouseX-this.x,2)<Math.pow(this.radius+this.hitDetectionRadius,2)}}),this.datasets=[],this.options.showTooltips&&helpers.bindEvents(this,this.options.tooltipEvents,function(evt){var activePoints="mouseout"!==evt.type?this.getPointsAtEvent(evt):[];this.eachPoints(function(point){point.restore(["fillColor","strokeColor"])}),helpers.each(activePoints,function(activePoint){activePoint.fillColor=activePoint.highlightFill,activePoint.strokeColor=activePoint.highlightStroke}),this.showTooltip(activePoints)}),helpers.each(data.datasets,function(dataset){var datasetObject={label:dataset.label||null,fillColor:dataset.fillColor,strokeColor:dataset.strokeColor,pointColor:dataset.pointColor,pointStrokeColor:dataset.pointStrokeColor,points:[]};this.datasets.push(datasetObject),helpers.each(dataset.data,function(dataPoint,index){datasetObject.points.push(new this.PointClass({value:dataPoint,label:data.labels[index],datasetLabel:dataset.label,strokeColor:dataset.pointStrokeColor,fillColor:dataset.pointColor,highlightFill:dataset.pointHighlightFill||dataset.pointColor,highlightStroke:dataset.pointHighlightStroke||dataset.pointStrokeColor}))},this),this.buildScale(data.labels),this.eachPoints(function(point,index){helpers.extend(point,{x:this.scale.calculateX(index),y:this.scale.endPoint}),point.save()},this)},this),this.render()},update:function(){this.scale.update(),helpers.each(this.activeElements,function(activeElement){activeElement.restore(["fillColor","strokeColor"])}),this.eachPoints(function(point){point.save()}),this.render()},eachPoints:function(callback){helpers.each(this.datasets,function(dataset){helpers.each(dataset.points,callback,this)},this)},getPointsAtEvent:function(e){var pointsArray=[],eventPosition=helpers.getRelativePosition(e);return helpers.each(this.datasets,function(dataset){helpers.each(dataset.points,function(point){point.inRange(eventPosition.x,eventPosition.y)&&pointsArray.push(point)})},this),pointsArray},buildScale:function(labels){var self=this,dataTotal=function(){var values=[];return self.eachPoints(function(point){values.push(point.value)}),values},scaleOptions={templateString:this.options.scaleLabel,height:this.chart.height,width:this.chart.width,ctx:this.chart.ctx,textColor:this.options.scaleFontColor,fontSize:this.options.scaleFontSize,fontStyle:this.options.scaleFontStyle,fontFamily:this.options.scaleFontFamily,valuesCount:labels.length,beginAtZero:this.options.scaleBeginAtZero,integersOnly:this.options.scaleIntegersOnly,calculateYRange:function(currentHeight){var updatedRanges=helpers.calculateScaleRange(dataTotal(),currentHeight,this.fontSize,this.beginAtZero,this.integersOnly);helpers.extend(this,updatedRanges)},xLabels:labels,font:helpers.fontString(this.options.scaleFontSize,this.options.scaleFontStyle,this.options.scaleFontFamily),lineWidth:this.options.scaleLineWidth,lineColor:this.options.scaleLineColor,showHorizontalLines:this.options.scaleShowHorizontalLines,showVerticalLines:this.options.scaleShowVerticalLines,gridLineWidth:this.options.scaleShowGridLines?this.options.scaleGridLineWidth:0,gridLineColor:this.options.scaleShowGridLines?this.options.scaleGridLineColor:"rgba(0,0,0,0)",padding:this.options.showScale?0:this.options.pointDotRadius+this.options.pointDotStrokeWidth,showLabels:this.options.scaleShowLabels,display:this.options.showScale};this.options.scaleOverride&&helpers.extend(scaleOptions,{calculateYRange:helpers.noop,steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}),this.scale=new Chart.Scale(scaleOptions)},addData:function(valuesArray,label){helpers.each(valuesArray,function(value,datasetIndex){this.datasets[datasetIndex].points.push(new this.PointClass({value:value,label:label,x:this.scale.calculateX(this.scale.valuesCount+1),y:this.scale.endPoint,strokeColor:this.datasets[datasetIndex].pointStrokeColor,fillColor:this.datasets[datasetIndex].pointColor}))},this),this.scale.addXLabel(label),this.update()},removeData:function(){this.scale.removeXLabel(),helpers.each(this.datasets,function(dataset){dataset.points.shift()},this),this.update()},reflow:function(){var newScaleProps=helpers.extend({height:this.chart.height,width:this.chart.width});this.scale.update(newScaleProps)},draw:function(ease){var easingDecimal=ease||1;this.clear();var ctx=this.chart.ctx,hasValue=function(item){return null!==item.value},nextPoint=function(point,collection,index){return helpers.findNextWhere(collection,hasValue,index)||point},previousPoint=function(point,collection,index){return helpers.findPreviousWhere(collection,hasValue,index)||point};this.scale.draw(easingDecimal),helpers.each(this.datasets,function(dataset){var pointsWithValues=helpers.where(dataset.points,hasValue);helpers.each(dataset.points,function(point,index){point.hasValue()&&point.transition({y:this.scale.calculateY(point.value),x:this.scale.calculateX(index)},easingDecimal)},this),this.options.bezierCurve&&helpers.each(pointsWithValues,function(point,index){var tension=index>0&&index<pointsWithValues.length-1?this.options.bezierCurveTension:0;point.controlPoints=helpers.splineCurve(previousPoint(point,pointsWithValues,index),point,nextPoint(point,pointsWithValues,index),tension),point.controlPoints.outer.y>this.scale.endPoint?point.controlPoints.outer.y=this.scale.endPoint:point.controlPoints.outer.y<this.scale.startPoint&&(point.controlPoints.outer.y=this.scale.startPoint),point.controlPoints.inner.y>this.scale.endPoint?point.controlPoints.inner.y=this.scale.endPoint:point.controlPoints.inner.y<this.scale.startPoint&&(point.controlPoints.inner.y=this.scale.startPoint)},this),ctx.lineWidth=this.options.datasetStrokeWidth,ctx.strokeStyle=dataset.strokeColor,ctx.beginPath(),helpers.each(pointsWithValues,function(point,index){if(0===index)ctx.moveTo(point.x,point.y);else if(this.options.bezierCurve){var previous=previousPoint(point,pointsWithValues,index);ctx.bezierCurveTo(previous.controlPoints.outer.x,previous.controlPoints.outer.y,point.controlPoints.inner.x,point.controlPoints.inner.y,point.x,point.y)}else ctx.lineTo(point.x,point.y)},this),ctx.stroke(),this.options.datasetFill&&pointsWithValues.length>0&&(ctx.lineTo(pointsWithValues[pointsWithValues.length-1].x,this.scale.endPoint),ctx.lineTo(pointsWithValues[0].x,this.scale.endPoint),ctx.fillStyle=dataset.fillColor,ctx.closePath(),ctx.fill()),helpers.each(pointsWithValues,function(point){point.draw()})},this)}})}).call(this);
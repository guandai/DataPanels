(function(){"use strict";var root=this,Chart=root.Chart,helpers=Chart.helpers;Chart.Type.extend({name:"Radar",defaults:{scaleShowLine:!0,angleShowLineOut:!0,scaleShowLabels:!1,scaleBeginAtZero:!0,angleLineColor:"rgba(0,0,0,.1)",angleLineWidth:1,pointLabelFontFamily:"'Arial'",pointLabelFontStyle:"normal",pointLabelFontSize:10,pointLabelFontColor:"#666",pointDot:!0,pointDotRadius:3,pointDotStrokeWidth:1,pointHitDetectionRadius:20,datasetStroke:!0,datasetStrokeWidth:2,datasetFill:!0,legendTemplate:'<ul class="<%=name.toLowerCase()%>-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'},initialize:function(data){this.PointClass=Chart.Point.extend({strokeWidth:this.options.pointDotStrokeWidth,radius:this.options.pointDotRadius,display:this.options.pointDot,hitDetectionRadius:this.options.pointHitDetectionRadius,ctx:this.chart.ctx}),this.datasets=[],this.buildScale(data),this.options.showTooltips&&helpers.bindEvents(this,this.options.tooltipEvents,function(evt){var activePointsCollection="mouseout"!==evt.type?this.getPointsAtEvent(evt):[];this.eachPoints(function(point){point.restore(["fillColor","strokeColor"])}),helpers.each(activePointsCollection,function(activePoint){activePoint.fillColor=activePoint.highlightFill,activePoint.strokeColor=activePoint.highlightStroke}),this.showTooltip(activePointsCollection)}),helpers.each(data.datasets,function(dataset){var datasetObject={label:dataset.label||null,fillColor:dataset.fillColor,strokeColor:dataset.strokeColor,pointColor:dataset.pointColor,pointStrokeColor:dataset.pointStrokeColor,points:[]};this.datasets.push(datasetObject),helpers.each(dataset.data,function(dataPoint,index){var pointPosition;this.scale.animation||(pointPosition=this.scale.getPointPosition(index,this.scale.calculateCenterOffset(dataPoint))),datasetObject.points.push(new this.PointClass({value:dataPoint,label:data.labels[index],datasetLabel:dataset.label,x:this.options.animation?this.scale.xCenter:pointPosition.x,y:this.options.animation?this.scale.yCenter:pointPosition.y,strokeColor:dataset.pointStrokeColor,fillColor:dataset.pointColor,highlightFill:dataset.pointHighlightFill||dataset.pointColor,highlightStroke:dataset.pointHighlightStroke||dataset.pointStrokeColor}))},this)},this),this.render()},eachPoints:function(callback){helpers.each(this.datasets,function(dataset){helpers.each(dataset.points,callback,this)},this)},getPointsAtEvent:function(evt){var mousePosition=helpers.getRelativePosition(evt),fromCenter=helpers.getAngleFromPoint({x:this.scale.xCenter,y:this.scale.yCenter},mousePosition),anglePerIndex=2*Math.PI/this.scale.valuesCount,pointIndex=Math.round((fromCenter.angle-1.5*Math.PI)/anglePerIndex),activePointsCollection=[];return(pointIndex>=this.scale.valuesCount||0>pointIndex)&&(pointIndex=0),fromCenter.distance<=this.scale.drawingArea&&helpers.each(this.datasets,function(dataset){activePointsCollection.push(dataset.points[pointIndex])}),activePointsCollection},buildScale:function(data){this.scale=new Chart.RadialScale({display:this.options.showScale,fontStyle:this.options.scaleFontStyle,fontSize:this.options.scaleFontSize,fontFamily:this.options.scaleFontFamily,fontColor:this.options.scaleFontColor,showLabels:this.options.scaleShowLabels,showLabelBackdrop:this.options.scaleShowLabelBackdrop,backdropColor:this.options.scaleBackdropColor,backdropPaddingY:this.options.scaleBackdropPaddingY,backdropPaddingX:this.options.scaleBackdropPaddingX,lineWidth:this.options.scaleShowLine?this.options.scaleLineWidth:0,lineColor:this.options.scaleLineColor,angleLineColor:this.options.angleLineColor,angleLineWidth:this.options.angleShowLineOut?this.options.angleLineWidth:0,pointLabelFontColor:this.options.pointLabelFontColor,pointLabelFontSize:this.options.pointLabelFontSize,pointLabelFontFamily:this.options.pointLabelFontFamily,pointLabelFontStyle:this.options.pointLabelFontStyle,height:this.chart.height,width:this.chart.width,xCenter:this.chart.width/2,yCenter:this.chart.height/2,ctx:this.chart.ctx,templateString:this.options.scaleLabel,labels:data.labels,valuesCount:data.datasets[0].data.length}),this.scale.setScaleSize(),this.updateScaleRange(data.datasets),this.scale.buildYLabels()},updateScaleRange:function(datasets){var valuesArray=function(){var totalDataArray=[];return helpers.each(datasets,function(dataset){dataset.data?totalDataArray=totalDataArray.concat(dataset.data):helpers.each(dataset.points,function(point){totalDataArray.push(point.value)})}),totalDataArray}(),scaleSizes=this.options.scaleOverride?{steps:this.options.scaleSteps,stepValue:this.options.scaleStepWidth,min:this.options.scaleStartValue,max:this.options.scaleStartValue+this.options.scaleSteps*this.options.scaleStepWidth}:helpers.calculateScaleRange(valuesArray,helpers.min([this.chart.width,this.chart.height])/2,this.options.scaleFontSize,this.options.scaleBeginAtZero,this.options.scaleIntegersOnly);helpers.extend(this.scale,scaleSizes)},addData:function(valuesArray,label){this.scale.valuesCount++,helpers.each(valuesArray,function(value,datasetIndex){var pointPosition=this.scale.getPointPosition(this.scale.valuesCount,this.scale.calculateCenterOffset(value));this.datasets[datasetIndex].points.push(new this.PointClass({value:value,label:label,x:pointPosition.x,y:pointPosition.y,strokeColor:this.datasets[datasetIndex].pointStrokeColor,fillColor:this.datasets[datasetIndex].pointColor}))},this),this.scale.labels.push(label),this.reflow(),this.update()},removeData:function(){this.scale.valuesCount--,this.scale.labels.shift(),helpers.each(this.datasets,function(dataset){dataset.points.shift()},this),this.reflow(),this.update()},update:function(){this.eachPoints(function(point){point.save()}),this.reflow(),this.render()},reflow:function(){helpers.extend(this.scale,{width:this.chart.width,height:this.chart.height,size:helpers.min([this.chart.width,this.chart.height]),xCenter:this.chart.width/2,yCenter:this.chart.height/2}),this.updateScaleRange(this.datasets),this.scale.setScaleSize(),this.scale.buildYLabels()},draw:function(ease){var easeDecimal=ease||1,ctx=this.chart.ctx;this.clear(),this.scale.draw(),helpers.each(this.datasets,function(dataset){helpers.each(dataset.points,function(point,index){point.hasValue()&&point.transition(this.scale.getPointPosition(index,this.scale.calculateCenterOffset(point.value)),easeDecimal)},this),ctx.lineWidth=this.options.datasetStrokeWidth,ctx.strokeStyle=dataset.strokeColor,ctx.beginPath(),helpers.each(dataset.points,function(point,index){0===index?ctx.moveTo(point.x,point.y):ctx.lineTo(point.x,point.y)},this),ctx.closePath(),ctx.stroke(),ctx.fillStyle=dataset.fillColor,ctx.fill(),helpers.each(dataset.points,function(point){point.hasValue()&&point.draw()})},this)}})}).call(this);
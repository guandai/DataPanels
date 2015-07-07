define(["./core","./var/slice","./callbacks"],function(jQuery,slice){return jQuery.extend({Deferred:function(func){var tuples=[["resolve","done",jQuery.Callbacks("once memory"),"resolved"],["reject","fail",jQuery.Callbacks("once memory"),"rejected"],["notify","progress",jQuery.Callbacks("memory")]],state="pending",promise={state:function(){return state},always:function(){return deferred.done(arguments).fail(arguments),this},then:function(){var fns=arguments;return jQuery.Deferred(function(newDefer){jQuery.each(tuples,function(i,tuple){var fn=jQuery.isFunction(fns[i])&&fns[i];deferred[tuple[1]](function(){var returned=fn&&fn.apply(this,arguments);returned&&jQuery.isFunction(returned.promise)?returned.promise().done(newDefer.resolve).fail(newDefer.reject).progress(newDefer.notify):newDefer[tuple[0]+"With"](this===promise?newDefer.promise():this,fn?[returned]:arguments)})}),fns=null}).promise()},promise:function(obj){return null!=obj?jQuery.extend(obj,promise):promise}},deferred={};return promise.pipe=promise.then,jQuery.each(tuples,function(i,tuple){var list=tuple[2],stateString=tuple[3];promise[tuple[1]]=list.add,stateString&&list.add(function(){state=stateString},tuples[1^i][2].disable,tuples[2][2].lock),deferred[tuple[0]]=function(){return deferred[tuple[0]+"With"](this===deferred?promise:this,arguments),this},deferred[tuple[0]+"With"]=list.fireWith}),promise.promise(deferred),func&&func.call(deferred,deferred),deferred},when:function(subordinate){var progressValues,progressContexts,resolveContexts,i=0,resolveValues=slice.call(arguments),length=resolveValues.length,remaining=1!==length||subordinate&&jQuery.isFunction(subordinate.promise)?length:0,deferred=1===remaining?subordinate:jQuery.Deferred(),updateFunc=function(i,contexts,values){return function(value){contexts[i]=this,values[i]=arguments.length>1?slice.call(arguments):value,values===progressValues?deferred.notifyWith(contexts,values):--remaining||deferred.resolveWith(contexts,values)}};if(length>1)for(progressValues=new Array(length),progressContexts=new Array(length),resolveContexts=new Array(length);length>i;i++)resolveValues[i]&&jQuery.isFunction(resolveValues[i].promise)?resolveValues[i].promise().done(updateFunc(i,resolveContexts,resolveValues)).fail(deferred.reject).progress(updateFunc(i,progressContexts,progressValues)):--remaining;return remaining||deferred.resolveWith(resolveContexts,resolveValues),deferred.promise()}}),jQuery});
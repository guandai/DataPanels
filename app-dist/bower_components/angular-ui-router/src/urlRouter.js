function $UrlRouterProvider($locationProvider,$urlMatcherFactory){function regExpPrefix(re){var prefix=/^\^((?:\\[^a-zA-Z0-9]|[^\\\[\]\^$*+?.()|{}]+)*)/.exec(re.source);return null!=prefix?prefix[1].replace(/\\(.)/g,"$1"):""}function interpolate(pattern,match){return pattern.replace(/\$(\$|\d{1,2})/,function(m,what){return match["$"===what?0:Number(what)]})}function handleIfMatch($injector,handler,match){if(!match)return!1;var result=$injector.invoke(handler,handler,{$match:match});return isDefined(result)?result:!0}function $get($location,$rootScope,$injector,$browser){function appendBasePath(url,isHtml5,absolute){return"/"===baseHref?url:isHtml5?baseHref.slice(0,-1)+url:absolute?baseHref.slice(1)+url:url}function update(evt){function check(rule){var handled=rule($injector,$location);return handled?(isString(handled)&&$location.replace().url(handled),!0):!1}if(!evt||!evt.defaultPrevented){{lastPushedUrl&&$location.url()===lastPushedUrl}lastPushedUrl=void 0;var i,n=rules.length;for(i=0;n>i;i++)if(check(rules[i]))return;otherwise&&check(otherwise)}}function listen(){return listener=listener||$rootScope.$on("$locationChangeSuccess",update)}var lastPushedUrl,baseHref=$browser.baseHref(),location=$location.url();return interceptDeferred||listen(),{sync:function(){update()},listen:function(){return listen()},update:function(read){return read?void(location=$location.url()):void($location.url()!==location&&($location.url(location),$location.replace()))},push:function(urlMatcher,params,options){var url=urlMatcher.format(params||{});null!==url&&params&&params["#"]&&(url+="#"+params["#"]),$location.url(url),lastPushedUrl=options&&options.$$avoidResync?$location.url():void 0,options&&options.replace&&$location.replace()},href:function(urlMatcher,params,options){if(!urlMatcher.validates(params))return null;var isHtml5=$locationProvider.html5Mode();angular.isObject(isHtml5)&&(isHtml5=isHtml5.enabled);var url=urlMatcher.format(params);if(options=options||{},isHtml5||null===url||(url="#"+$locationProvider.hashPrefix()+url),null!==url&&params&&params["#"]&&(url+="#"+params["#"]),url=appendBasePath(url,isHtml5,options.absolute),!options.absolute||!url)return url;var slash=!isHtml5&&url?"/":"",port=$location.port();return port=80===port||443===port?"":":"+port,[$location.protocol(),"://",$location.host(),port,slash,url].join("")}}}var listener,rules=[],otherwise=null,interceptDeferred=!1;this.rule=function(rule){if(!isFunction(rule))throw new Error("'rule' must be a function");return rules.push(rule),this},this.otherwise=function(rule){if(isString(rule)){var redirect=rule;rule=function(){return redirect}}else if(!isFunction(rule))throw new Error("'rule' must be a function");return otherwise=rule,this},this.when=function(what,handler){var redirect,handlerIsString=isString(handler);if(isString(what)&&(what=$urlMatcherFactory.compile(what)),!handlerIsString&&!isFunction(handler)&&!isArray(handler))throw new Error("invalid 'handler' in when()");var strategies={matcher:function(what,handler){return handlerIsString&&(redirect=$urlMatcherFactory.compile(handler),handler=["$match",function($match){return redirect.format($match)}]),extend(function($injector,$location){return handleIfMatch($injector,handler,what.exec($location.path(),$location.search()))},{prefix:isString(what.prefix)?what.prefix:""})},regex:function(what,handler){if(what.global||what.sticky)throw new Error("when() RegExp must not be global or sticky");return handlerIsString&&(redirect=handler,handler=["$match",function($match){return interpolate(redirect,$match)}]),extend(function($injector,$location){return handleIfMatch($injector,handler,what.exec($location.path()))},{prefix:regExpPrefix(what)})}},check={matcher:$urlMatcherFactory.isMatcher(what),regex:what instanceof RegExp};for(var n in check)if(check[n])return this.rule(strategies[n](what,handler));throw new Error("invalid 'what' in when()")},this.deferIntercept=function(defer){void 0===defer&&(defer=!0),interceptDeferred=defer},this.$get=$get,$get.$inject=["$location","$rootScope","$injector","$browser"]}$UrlRouterProvider.$inject=["$locationProvider","$urlMatcherFactoryProvider"],angular.module("ui.router.router").provider("$urlRouter",$UrlRouterProvider);
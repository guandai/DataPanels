define(["./core","./var/rnotwhite","./ajax/var/nonce","./ajax/var/rquery","./core/init","./ajax/parseJSON","./ajax/parseXML","./deferred"],function(jQuery,rnotwhite,nonce,rquery){function addToPrefiltersOrTransports(structure){return function(dataTypeExpression,func){"string"!=typeof dataTypeExpression&&(func=dataTypeExpression,dataTypeExpression="*");var dataType,i=0,dataTypes=dataTypeExpression.toLowerCase().match(rnotwhite)||[];if(jQuery.isFunction(func))for(;dataType=dataTypes[i++];)"+"===dataType.charAt(0)?(dataType=dataType.slice(1)||"*",(structure[dataType]=structure[dataType]||[]).unshift(func)):(structure[dataType]=structure[dataType]||[]).push(func)}}function inspectPrefiltersOrTransports(structure,options,originalOptions,jqXHR){function inspect(dataType){var selected;return inspected[dataType]=!0,jQuery.each(structure[dataType]||[],function(_,prefilterOrFactory){var dataTypeOrTransport=prefilterOrFactory(options,originalOptions,jqXHR);return"string"!=typeof dataTypeOrTransport||seekingTransport||inspected[dataTypeOrTransport]?seekingTransport?!(selected=dataTypeOrTransport):void 0:(options.dataTypes.unshift(dataTypeOrTransport),inspect(dataTypeOrTransport),!1)}),selected}var inspected={},seekingTransport=structure===transports;return inspect(options.dataTypes[0])||!inspected["*"]&&inspect("*")}function ajaxExtend(target,src){var deep,key,flatOptions=jQuery.ajaxSettings.flatOptions||{};for(key in src)void 0!==src[key]&&((flatOptions[key]?target:deep||(deep={}))[key]=src[key]);return deep&&jQuery.extend(!0,target,deep),target}function ajaxHandleResponses(s,jqXHR,responses){for(var firstDataType,ct,finalDataType,type,contents=s.contents,dataTypes=s.dataTypes;"*"===dataTypes[0];)dataTypes.shift(),void 0===ct&&(ct=s.mimeType||jqXHR.getResponseHeader("Content-Type"));if(ct)for(type in contents)if(contents[type]&&contents[type].test(ct)){dataTypes.unshift(type);break}if(dataTypes[0]in responses)finalDataType=dataTypes[0];else{for(type in responses){if(!dataTypes[0]||s.converters[type+" "+dataTypes[0]]){finalDataType=type;break}firstDataType||(firstDataType=type)}finalDataType=finalDataType||firstDataType}return finalDataType?(finalDataType!==dataTypes[0]&&dataTypes.unshift(finalDataType),responses[finalDataType]):void 0}function ajaxConvert(s,response,jqXHR,isSuccess){var conv2,current,conv,tmp,prev,converters={},dataTypes=s.dataTypes.slice();if(dataTypes[1])for(conv in s.converters)converters[conv.toLowerCase()]=s.converters[conv];for(current=dataTypes.shift();current;)if(s.responseFields[current]&&(jqXHR[s.responseFields[current]]=response),!prev&&isSuccess&&s.dataFilter&&(response=s.dataFilter(response,s.dataType)),prev=current,current=dataTypes.shift())if("*"===current)current=prev;else if("*"!==prev&&prev!==current){if(conv=converters[prev+" "+current]||converters["* "+current],!conv)for(conv2 in converters)if(tmp=conv2.split(" "),tmp[1]===current&&(conv=converters[prev+" "+tmp[0]]||converters["* "+tmp[0]])){conv===!0?conv=converters[conv2]:converters[conv2]!==!0&&(current=tmp[0],dataTypes.unshift(tmp[1]));break}if(conv!==!0)if(conv&&s["throws"])response=conv(response);else try{response=conv(response)}catch(e){return{state:"parsererror",error:conv?e:"No conversion from "+prev+" to "+current}}}return{state:"success",data:response}}var ajaxLocParts,ajaxLocation,rhash=/#.*$/,rts=/([?&])_=[^&]*/,rheaders=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,rlocalProtocol=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,rnoContent=/^(?:GET|HEAD)$/,rprotocol=/^\/\//,rurl=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,prefilters={},transports={},allTypes="*/".concat("*");try{ajaxLocation=location.href}catch(e){ajaxLocation=document.createElement("a"),ajaxLocation.href="",ajaxLocation=ajaxLocation.href}return ajaxLocParts=rurl.exec(ajaxLocation.toLowerCase())||[],jQuery.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ajaxLocation,type:"GET",isLocal:rlocalProtocol.test(ajaxLocParts[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":allTypes,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":jQuery.parseJSON,"text xml":jQuery.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(target,settings){return settings?ajaxExtend(ajaxExtend(target,jQuery.ajaxSettings),settings):ajaxExtend(jQuery.ajaxSettings,target)},ajaxPrefilter:addToPrefiltersOrTransports(prefilters),ajaxTransport:addToPrefiltersOrTransports(transports),ajax:function(url,options){function done(status,nativeStatusText,responses,headers){var isSuccess,success,error,response,modified,statusText=nativeStatusText;2!==state&&(state=2,timeoutTimer&&clearTimeout(timeoutTimer),transport=void 0,responseHeadersString=headers||"",jqXHR.readyState=status>0?4:0,isSuccess=status>=200&&300>status||304===status,responses&&(response=ajaxHandleResponses(s,jqXHR,responses)),response=ajaxConvert(s,response,jqXHR,isSuccess),isSuccess?(s.ifModified&&(modified=jqXHR.getResponseHeader("Last-Modified"),modified&&(jQuery.lastModified[cacheURL]=modified),modified=jqXHR.getResponseHeader("etag"),modified&&(jQuery.etag[cacheURL]=modified)),204===status||"HEAD"===s.type?statusText="nocontent":304===status?statusText="notmodified":(statusText=response.state,success=response.data,error=response.error,isSuccess=!error)):(error=statusText,(status||!statusText)&&(statusText="error",0>status&&(status=0))),jqXHR.status=status,jqXHR.statusText=(nativeStatusText||statusText)+"",isSuccess?deferred.resolveWith(callbackContext,[success,statusText,jqXHR]):deferred.rejectWith(callbackContext,[jqXHR,statusText,error]),jqXHR.statusCode(statusCode),statusCode=void 0,fireGlobals&&globalEventContext.trigger(isSuccess?"ajaxSuccess":"ajaxError",[jqXHR,s,isSuccess?success:error]),completeDeferred.fireWith(callbackContext,[jqXHR,statusText]),fireGlobals&&(globalEventContext.trigger("ajaxComplete",[jqXHR,s]),--jQuery.active||jQuery.event.trigger("ajaxStop")))}"object"==typeof url&&(options=url,url=void 0),options=options||{};var parts,i,cacheURL,responseHeadersString,timeoutTimer,fireGlobals,transport,responseHeaders,s=jQuery.ajaxSetup({},options),callbackContext=s.context||s,globalEventContext=s.context&&(callbackContext.nodeType||callbackContext.jquery)?jQuery(callbackContext):jQuery.event,deferred=jQuery.Deferred(),completeDeferred=jQuery.Callbacks("once memory"),statusCode=s.statusCode||{},requestHeaders={},requestHeadersNames={},state=0,strAbort="canceled",jqXHR={readyState:0,getResponseHeader:function(key){var match;if(2===state){if(!responseHeaders)for(responseHeaders={};match=rheaders.exec(responseHeadersString);)responseHeaders[match[1].toLowerCase()]=match[2];match=responseHeaders[key.toLowerCase()]}return null==match?null:match},getAllResponseHeaders:function(){return 2===state?responseHeadersString:null},setRequestHeader:function(name,value){var lname=name.toLowerCase();return state||(name=requestHeadersNames[lname]=requestHeadersNames[lname]||name,requestHeaders[name]=value),this},overrideMimeType:function(type){return state||(s.mimeType=type),this},statusCode:function(map){var code;if(map)if(2>state)for(code in map)statusCode[code]=[statusCode[code],map[code]];else jqXHR.always(map[jqXHR.status]);return this},abort:function(statusText){var finalText=statusText||strAbort;return transport&&transport.abort(finalText),done(0,finalText),this}};if(deferred.promise(jqXHR).complete=completeDeferred.add,jqXHR.success=jqXHR.done,jqXHR.error=jqXHR.fail,s.url=((url||s.url||ajaxLocation)+"").replace(rhash,"").replace(rprotocol,ajaxLocParts[1]+"//"),s.type=options.method||options.type||s.method||s.type,s.dataTypes=jQuery.trim(s.dataType||"*").toLowerCase().match(rnotwhite)||[""],null==s.crossDomain&&(parts=rurl.exec(s.url.toLowerCase()),s.crossDomain=!(!parts||parts[1]===ajaxLocParts[1]&&parts[2]===ajaxLocParts[2]&&(parts[3]||("http:"===parts[1]?"80":"443"))===(ajaxLocParts[3]||("http:"===ajaxLocParts[1]?"80":"443")))),s.data&&s.processData&&"string"!=typeof s.data&&(s.data=jQuery.param(s.data,s.traditional)),inspectPrefiltersOrTransports(prefilters,s,options,jqXHR),2===state)return jqXHR;fireGlobals=jQuery.event&&s.global,fireGlobals&&0===jQuery.active++&&jQuery.event.trigger("ajaxStart"),s.type=s.type.toUpperCase(),s.hasContent=!rnoContent.test(s.type),cacheURL=s.url,s.hasContent||(s.data&&(cacheURL=s.url+=(rquery.test(cacheURL)?"&":"?")+s.data,delete s.data),s.cache===!1&&(s.url=rts.test(cacheURL)?cacheURL.replace(rts,"$1_="+nonce++):cacheURL+(rquery.test(cacheURL)?"&":"?")+"_="+nonce++)),s.ifModified&&(jQuery.lastModified[cacheURL]&&jqXHR.setRequestHeader("If-Modified-Since",jQuery.lastModified[cacheURL]),jQuery.etag[cacheURL]&&jqXHR.setRequestHeader("If-None-Match",jQuery.etag[cacheURL])),(s.data&&s.hasContent&&s.contentType!==!1||options.contentType)&&jqXHR.setRequestHeader("Content-Type",s.contentType),jqXHR.setRequestHeader("Accept",s.dataTypes[0]&&s.accepts[s.dataTypes[0]]?s.accepts[s.dataTypes[0]]+("*"!==s.dataTypes[0]?", "+allTypes+"; q=0.01":""):s.accepts["*"]);for(i in s.headers)jqXHR.setRequestHeader(i,s.headers[i]);if(s.beforeSend&&(s.beforeSend.call(callbackContext,jqXHR,s)===!1||2===state))return jqXHR.abort();strAbort="abort";for(i in{success:1,error:1,complete:1})jqXHR[i](s[i]);if(transport=inspectPrefiltersOrTransports(transports,s,options,jqXHR)){jqXHR.readyState=1,fireGlobals&&globalEventContext.trigger("ajaxSend",[jqXHR,s]),s.async&&s.timeout>0&&(timeoutTimer=setTimeout(function(){jqXHR.abort("timeout")},s.timeout));try{state=1,transport.send(requestHeaders,done)}catch(e){if(!(2>state))throw e;done(-1,e)}}else done(-1,"No Transport");return jqXHR},getJSON:function(url,data,callback){return jQuery.get(url,data,callback,"json")},getScript:function(url,callback){return jQuery.get(url,void 0,callback,"script")}}),jQuery.each(["get","post"],function(i,method){jQuery[method]=function(url,data,callback,type){return jQuery.isFunction(data)&&(type=type||callback,callback=data,data=void 0),jQuery.ajax({url:url,type:method,dataType:type,data:data,success:callback})}}),jQuery});
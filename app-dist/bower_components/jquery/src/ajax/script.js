define(["../core","../ajax"],function(jQuery){jQuery.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(text){return jQuery.globalEval(text),text}}}),jQuery.ajaxPrefilter("script",function(s){void 0===s.cache&&(s.cache=!1),s.crossDomain&&(s.type="GET",s.global=!1)}),jQuery.ajaxTransport("script",function(s){if(s.crossDomain){var script,head=document.head||jQuery("head")[0]||document.documentElement;return{send:function(_,callback){script=document.createElement("script"),script.async=!0,s.scriptCharset&&(script.charset=s.scriptCharset),script.src=s.url,script.onload=script.onreadystatechange=function(_,isAbort){(isAbort||!script.readyState||/loaded|complete/.test(script.readyState))&&(script.onload=script.onreadystatechange=null,script.parentNode&&script.parentNode.removeChild(script),script=null,isAbort||callback(200,"success"))},head.insertBefore(script,head.firstChild)},abort:function(){script&&script.onload(void 0,!0)}}}})});
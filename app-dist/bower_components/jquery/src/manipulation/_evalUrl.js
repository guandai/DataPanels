define(["../ajax"],function(jQuery){return jQuery._evalUrl=function(url){return jQuery.ajax({url:url,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},jQuery._evalUrl});
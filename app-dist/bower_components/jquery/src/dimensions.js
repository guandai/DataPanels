define(["./core","./core/access","./css"],function(jQuery,access){return jQuery.each({Height:"height",Width:"width"},function(name,type){jQuery.each({padding:"inner"+name,content:type,"":"outer"+name},function(defaultExtra,funcName){jQuery.fn[funcName]=function(margin,value){var chainable=arguments.length&&(defaultExtra||"boolean"!=typeof margin),extra=defaultExtra||(margin===!0||value===!0?"margin":"border");return access(this,function(elem,type,value){var doc;return jQuery.isWindow(elem)?elem.document.documentElement["client"+name]:9===elem.nodeType?(doc=elem.documentElement,Math.max(elem.body["scroll"+name],doc["scroll"+name],elem.body["offset"+name],doc["offset"+name],doc["client"+name])):void 0===value?jQuery.css(elem,type,extra):jQuery.style(elem,type,value,extra)},type,chainable?margin:void 0,chainable,null)}})}),jQuery});
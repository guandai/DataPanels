define(["../core","./support","../core/init"],function(jQuery,support){var rreturn=/\r/g;jQuery.fn.extend({val:function(value){var hooks,ret,isFunction,elem=this[0];{if(arguments.length)return isFunction=jQuery.isFunction(value),this.each(function(i){var val;1===this.nodeType&&(val=isFunction?value.call(this,i,jQuery(this).val()):value,null==val?val="":"number"==typeof val?val+="":jQuery.isArray(val)&&(val=jQuery.map(val,function(value){return null==value?"":value+""})),hooks=jQuery.valHooks[this.type]||jQuery.valHooks[this.nodeName.toLowerCase()],hooks&&"set"in hooks&&void 0!==hooks.set(this,val,"value")||(this.value=val))});if(elem)return hooks=jQuery.valHooks[elem.type]||jQuery.valHooks[elem.nodeName.toLowerCase()],hooks&&"get"in hooks&&void 0!==(ret=hooks.get(elem,"value"))?ret:(ret=elem.value,"string"==typeof ret?ret.replace(rreturn,""):null==ret?"":ret)}}}),jQuery.extend({valHooks:{option:{get:function(elem){var val=jQuery.find.attr(elem,"value");return null!=val?val:jQuery.trim(jQuery.text(elem))}},select:{get:function(elem){for(var value,option,options=elem.options,index=elem.selectedIndex,one="select-one"===elem.type||0>index,values=one?null:[],max=one?index+1:options.length,i=0>index?max:one?index:0;max>i;i++)if(option=options[i],!(!option.selected&&i!==index||(support.optDisabled?option.disabled:null!==option.getAttribute("disabled"))||option.parentNode.disabled&&jQuery.nodeName(option.parentNode,"optgroup"))){if(value=jQuery(option).val(),one)return value;values.push(value)}return values},set:function(elem,value){for(var optionSet,option,options=elem.options,values=jQuery.makeArray(value),i=options.length;i--;)if(option=options[i],jQuery.inArray(jQuery.valHooks.option.get(option),values)>=0)try{option.selected=optionSet=!0}catch(_){option.scrollHeight}else option.selected=!1;return optionSet||(elem.selectedIndex=-1),options}}}}),jQuery.each(["radio","checkbox"],function(){jQuery.valHooks[this]={set:function(elem,value){return jQuery.isArray(value)?elem.checked=jQuery.inArray(jQuery(elem).val(),value)>=0:void 0}},support.checkOn||(jQuery.valHooks[this].get=function(elem){return null===elem.getAttribute("value")?"on":elem.value})})});
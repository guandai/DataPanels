/*!
 angularAMD v0.2.1
 (c) 2013-2014 Marcos Lin https://github.com/marcoslin/
 License: MIT
*/

define({load:function(name,req,onload){"use strict";req(["angularAMD",name],function(angularAMD,value){angularAMD.processQueue(),onload(value)})}});
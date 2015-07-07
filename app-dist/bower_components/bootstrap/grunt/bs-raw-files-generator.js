/*!
 * Bootstrap Grunt task for generating raw-files.min.js for the Customizer
 * http://getbootstrap.com
 * Copyright 2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 */

function getFiles(type){var files={};return fs.readdirSync(type).filter(function(path){return"fonts"===type?!0:new RegExp("\\."+type+"$").test(path)}).forEach(function(path){var fullPath=type+"/"+path;files[path]="fonts"===type?btoa(fs.readFileSync(fullPath)):fs.readFileSync(fullPath,"utf8")}),"var __"+type+" = "+JSON.stringify(files)+"\n"}var btoa=require("btoa"),fs=require("fs");module.exports=function(banner){banner||(banner="");var files=banner+getFiles("js")+getFiles("less")+getFiles("fonts");fs.writeFileSync("docs/assets/js/raw-files.min.js",files)};
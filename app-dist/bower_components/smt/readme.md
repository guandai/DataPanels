===== Getting started ===

To install dependencies:
	npm install   


Install "supervisor" 
npm install -g supervisor


-node install

npm install guandai/smt

-or  by  bower

bower install guandai/smt


## function list



#### revertjson
*  revert vertical and horizental in a json



#### fillzero
*  fill 0 in front of  digits by assigned digits number


####creatfolder

 *create folder by a given path and set 0777 access @param{obj} cjb , current
 * job object
 


####enumobj
* enumerate each object in a object to match valname



####replacepeer

 *replace by peer in allsettings
 


####tru

 *util.ispect a object
 


####tranHtml2Txt

 *replace html entities to text
 


####trl

 *console.log wrapper
 


####trmem

 *show process memoryuse
 


####trn

 *show each content in object seperately 
 


####tr

 *trace conten with logger
 


####tc

 *wrapper of console.log()
 


####osize

 *find an object  size / length
 * @param{objet} obj          , current job
 * @return{int} count         , a size number in byte
 


####arrainbtest

 *compare if a array in anoterh array, if A in B
 * @param{array} arra         ,  A array 
 * @param{array} arrb         ,  B array 
 * @return{boolean} result    , in or not in
 


####arradiffb

 *create array  which only A have plus which only B have
 * @param{array} arra         ,  A array 
 * @param{array} arrb         ,  B array 
 * @return{array} arrd    ,  A  B different parts
 


####arraoverb

 *create array  which only A over B 
 * @param{array} arra         ,  A array 
 * @param{array} arrb         ,  B array 
 * @return{array} arrd    ,  A  B same parts
 


####arragtb

 *create array  which A more than B
 * @param{array} arra         ,  A array 
 * @param{array} arrb         ,  B array 
 * @return{array} arrm    ,  A more than B
 


####cloneobj

 *clone an object  another version
 * @param{object} obj         , current job
 


####clone

 *clone an object
 * @param{object} obj         , current job
 


####obj2arr

 * convert obj to arr.
 *  @param{obj} org obj   , 
 *  @return{array}  ,  
 


####obj2reg

 * convert obj to regular exp.   expect obj is list of string 
 *  @param{obj} org obj   , 
 *  @return{regexp}          ,  
 


####secondsToString

 * change seconts to higher time unit.
 * @param{number} seconds       , original text to be cutyed
 * @return{String}          ,  a combination text of hour  minutes and seconds
 


####tobj

 *trace 1st level content in an object
 * @param{objet} obj          , current job 
 

####translatestr

 *do something useful for buffers  when loading a uri
 * @param{string} str         , a input str need to be translate
 * @param{object} dictobj     , a object include map as a dict
 * @return{string} str        ,  return the translated str 
 



####joinAsArray

 *join several obj and convert to array
 * @param{array} orgarr   ,  multipal array can be used as params, which need to be join togething
 * @return{array} newarr  ,   join several obj and convert to array 
 


####func2obj

 *convert a function to a object, which can use call backs with parameter
 * @param{function} infunc   ,  a function need to be convert
 * @attribute{function} callback   ,  a single function or multiple functino in an array.
 * @return{object} this  ,  a object that support .callback
 



####assignErr

 *common use for put err in option for cb refer
 * @param{option} object for current running process o refer
 * @param{err}   err we focusing on 
 * @return{option} 
 


####runcbsfn

 *run in serials
 


####runcbs

 *run a serial of callbackk in an array , each cb has .run method.
 * this need to be runing with func2Obj to impliment a sync process
 * @param{funcArr} Array with str   ,  a number or string of function name
 * @return{null} 
 


####makecb

 *add params for a callback
 * @param{function} infunc   ,  original callback function
 * @attribute{int} length   ,  the expected length
 * @return{string} str  ,  return result string 
 


####mergeobj

 *copy appendObj data to orgObj, if the same , 
 * appendObjs content will overwrite orgobj content
 * @param{object} orgObj   ,  original object
 * @attribute{object} appendObj   ,  the  addon object
 * @return{object} orgObj  ,  return result object
 



####tolen

 *convert a string to expect length 
 * @param{mix} str   ,  a number or string need to be adept 
 * @attribute{int} length   ,  the expected length
 * @return{string} str  ,  return result string 
 


####getMaxOfArray

 *get the max number in an array 
 * @param{Array} numArray   ,  a number or string need to be adept 
 * @return{Int} return  ,  return max of result number
 


####gettime

 * return a yy+"_"+mm+"_"+dd+"_"+hh+"_"+mi+"_"+ss  string
 


####filldigits

 * fill 0 in front of  digits by assigned digits number
 


####cutdec

 * fill 0 in front of  digits by assigned digits number
 


####shortenunit

 * show size in mb gb
 


####uppath

 * get parent path, return string
 


####String.prototype.replaceall 

 * get parent path, return string
 


####String.prototype.splice 

 *insert char in a string
 


####String.prototype.replaceAll 

 *replaceAll for string
 

####get class name of a object
*Object.prototype.getName


####finishfn

 *print task finished]
 


####trobjmem
 *show a object memory use
 *@param{object} object   ,  show mem use of this param
 


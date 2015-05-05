

/* Services */

var widgetServices = angular.module('widgetServices', ['ngResource']);

widgetServices.factory('Email', ['$resource',
  function($resource){
    var scope = {}
    var Email = $resource('data/emails.json');    
    Email.get().$promise.then(function(response) {
            tr( "size of data:",osize( response ) )
            var ta = ["year", "month", "day"]
           
           // define objects
            for (var i in ta) {
              scope[ ta[i] + "Data"] = {}  
            }
            
            // definde processing function 
            function builddata(  s , n , d ){
              if( !s[n] ) s[n] = {"emailSent":0 , "emailReceived":0 , "emailReply":0 , "receivedPer":0, "replyPer":0}     
              s[n]["emailSent"] += d["emails sent"]
              s[n]["emailReceived"] += d["email received"]
              s[n]["emailReply"] += d["email reply"]
              s[n]["receivedPer"] =  cutper(s[n]["emailReceived"] / s[n]["emailSent"])
              s[n]["replyPer"] =  cutper(s[n]["emailReply"] / s[n]["emailSent"])
              return s
            }

            // pre processing emails data
            for (var t in response)
            {   
                var data = response[t]
                // filter out data which is not from json,  original response include promise and funcitons
                if(t.match(/\d{4}-\d{2}-\d{2}/)){  
                  //  define new object name  and lable name
                  scope.yearname =  t.match(/(\d{4})-/)[1]
                  scope.monthname =  scope.yearname + "-" +  t.match(/-(\d{2})-/)[1]
                  scope.dayname =  t.match(/-(\d{2}-\d{2})/)[1]       
                  for (var i in ta){  
                    scope[ta[i]+"Data"] = builddata(  scope[ ta[i]+"Data"] , scope[ ta[i] +"name"] , data)  
                  }
                }
            }

            for (var i in ta){ 
               // generate labels
               scope[ta[i]+"Labels"] = Object.keys(scope[ta[i]+"Data"])
               // revert row and column
               scope[ta[i]+"DataRev"]= revertjson(scope[ta[i]+"Data"])
               tr("yeardata:", scope[ta[i]+"Data"] )
            }
        });
    
    Email.scope=scope
    return Email

  }]);


widgetServices.factory('Widget', ['$resource',
    function($resource){
        var scope = {}  
        var Widget = $resource('data/widgets.json');
        Widget.get().$promise.then(function(response) {
           // resonse also include promise and functions 
           // loop to keep Object is real data
           var keepWidgets = []
           for(var w in response){
            if( response[w].objtype == "widget" )
                keepWidgets.push( response[w] )
           }
           scope.widgets = keepWidgets
        });

        // set to widget scope
        Widget.scope = scope
        return Widget
        
  }]);

    
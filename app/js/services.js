define([
    'angular'
], function(angular) {

    /* Services */ 

    var widgetServices = angular.module('widgetServices', ['ngResource']);

    widgetServices.factory('resourceExample', ['$resource', function($resource) {

        var SomeResources = $resource('/app/api/:apiid', {
            setId: "get_this_from_controller", //  this is from controller
            apiid: '@setId', //  it is better not use :apiid,  it sohuld be only for url param  this will  be  overwrited  from controller
        }, {
            customAction: {
                method: 'GET',
                url: '/app/api/customize/test.json',
                isArray: false
            },
            getbyid: {
                method: 'GET'
            }
        });

        // // this will run immediately  
        // SomeResources.customAction(function(data, getResponseHeaders) {
        //     //console.log(data)
        //     //console.log(getResponseHeaders())
        // })


        return SomeResources
    }])


    widgetServices.factory("value", function() {
        return {
            "reviewHeight": 140,
            "reviewWidth": 260,
            "reviewMaxWidth": 500,
            "changeHeight": 0
        }
    })



    widgetServices.factory('smt', function() {
        return {
            getScope: function(e) {
                return angular.element(e).scope();
            },

            getint: function(str) {
                return parseInt(str.match(/-?\d*/))
            },
            getcssint: function(ele, jqselector, attr) {
                return parseInt(ele.find(jqselector).css(attr).match(/.*(?=px)/))
            }
        }
    })


    // inject a function  for animation 
    widgetServices.factory('anifn', ['smt', function(smt) {

        return {
            setAniOpt: function(element, curclass, done) {
                var aniopt = {}
                aniopt.duration = 500;
                scope = smt.getScope(element)
                aniopt.complete = function() {
                    done
                    // tr("done aniclass")
                    // clear aniclass  it could be parent.anicalss if use for repeat
                    scope.$apply(function() {
                        var scopeName = element[0].attributes['ng-class'].value.match(/[\s\,\[]?(\w*Scope)\.aniclass/)[1]
                            // tr(element[0])
                            // tr(scope[scopeName])
                        scope[scopeName].aniclass = "";
                        tr("clear aniclass")
                    })
                }
                return aniopt;
            },

            animateReview: function(props) {
                tr("initial", props)
                    // need to get instance of function  
                var rundone = this.rundone
                var setAniOpt = this.setAniOpt

                return {
                    addClass: function(element, curclass, done) {
                        tr("start addClass:", curclass)
                        var aniopt = setAniOpt.apply(null, arguments)
                        jQuery(element).clearQueue().animate(
                            props,
                            aniopt
                        );
                    },
                    removeClass: function(element, curclass, done) {
                        //var aniopt = setAniOpt.apply(null, arguments)
                        done
                        tr("removed", curclass)
                            //rundone.apply(this, args)
                    }
                }
            }

        }
    }])





    widgetServices.factory('Review', ['$http',
        function($http) {
            var scope = {}
            var Review = $http.get('data/reviews.js').success(function(data) {

                tr("size of data:", osize(data))
                    // format input data as an valid Array 
                var spos = data.indexOf("[")
                var epos = data.lastIndexOf("]")
                data = data.substring(spos, epos + 1).replaceAll(/[\n\t\r]*/, "").replaceAll(/\},[\s]*/, "},").replace("},]", "}]")
                data = JSON.parse(data)
                    //tr("review factory get reviews...")
                    // tr(data)
                var average = 0
                var count = 0
                for (var i in data) {

                    if (!isNaN(parseInt(data[i].starRating))) {
                        data[i].showall = false;
                        data[i].id = count;
                        count++
                        average = (average + parseInt(data[i].starRating))
                    } else {
                        delete data[i]
                    }
                }
                scope.totalReview = count;
                scope.average = Math.floor(average / count);
                tr("review size:", osize(data), data)
                scope.reviews = data
            });

            Review.scope = scope
            return Review
        }
    ]);


    widgetServices.factory('Widget', ["$http", "$localStorage",
        function($http, $localStorage) {
            var scope = {}
            var Widget = $http.get('data/widgets.json').success(function(data) {
                scope.widgets = data
                    // set default localStroage
                    // $localStorage.$reset()
                for (var index in scope.widgets) {
                    if ($localStorage.widgetsCheckedSettings[index] != undefined) scope.widgets[index].checked = $localStorage.widgetsCheckedSettings[index]
                }
            });

            Widget.scope = scope
            return Widget
        }
    ]);



    widgetServices.factory('Email', ['$http',
        function($http) {
            var scope = {}

            // Email.get().$promise.then(function(response) {
            var Email = $http.get('data/emails.json').success(function(response) {
                tr("size of data:", osize(response))
                var ta = ["year", "month", "day"]

                // define objects
                for (var i in ta) {
                    scope[ta[i] + "Data"] = {}
                }

                // definde processing function 
                function builddata(s, n, d) {
                    if (!s[n]) s[n] = {
                        "emailSent": 0,
                        "emailReceived": 0,
                        "emailReply": 0,
                        "receivedPer": 0,
                        "replyPer": 0
                    }
                    s[n]["emailSent"] += d["emails sent"]
                    s[n]["emailReceived"] += d["email received"]
                    s[n]["emailReply"] += d["email reply"]
                    s[n]["receivedPer"] = cutper(s[n]["emailReceived"] / s[n]["emailSent"])
                    s[n]["replyPer"] = cutper(s[n]["emailReply"] / s[n]["emailSent"])
                    return s
                }

                // pre processing emails data
                for (var t in response) {
                    var data = response[t]
                        // filter out data which is not from json,  original response include promise and funcitons
                    if (t.match(/\d{4}-\d{2}-\d{2}/)) {
                        //  define new object name  and lable name
                        scope.yearname = t.match(/(\d{4})-/)[1]
                        scope.monthname = scope.yearname + "-" + t.match(/-(\d{2})-/)[1]
                        scope.dayname = t.match(/-(\d{2}-\d{2})/)[1]
                        for (var i in ta) {
                            scope[ta[i] + "Data"] = builddata(scope[ta[i] + "Data"], scope[ta[i] + "name"], data)
                        }
                    }
                }

                for (var i in ta) {
                    // generate labels
                    scope[ta[i] + "Labels"] = Object.keys(scope[ta[i] + "Data"])
                        // revert row and column
                    scope[ta[i] + "DataRev"] = revertjson(scope[ta[i] + "Data"])
                        //tr("data:", scope[ta[i]+"Data"] )
                }
            });

            Email.scope = scope
            return Email
        }
    ]);





});

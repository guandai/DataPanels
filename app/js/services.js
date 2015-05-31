/* Services */

var widgetServices = angular.module('widgetServices', []);

widgetServices.factory("value", function() {
    return {
        "reviewHeight": 140,
        "reviewWidth": 260,
        "reviewMaxWidth":500,
        "changeHeight": 0
    }
})

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
            tr("review factory get reviews...")
                // tr(data)
            var average = 0
            var count = 0
            for (var i in data) {
                data[i].showall = false;
                data[i].id = i;

                if (!isNaN(parseInt(data[i].starRating))) {
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


widgetServices.factory('Widget', ["$http",
    function($http) {
        var scope = {}
        var Widget = $http.get('data/widgets.json').success(function(data) {
            scope.widgets = data
        });
        Widget.scope = scope
        return Widget
    }
]);





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
            scope=smt.getScope(element) 
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
                    tr("start addClass:",curclass )
                    var aniopt = setAniOpt.apply(null, arguments)
                    jQuery(element).clearQueue().animate(
                        props,
                        aniopt
                    );
                }
                ,
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

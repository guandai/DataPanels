'use strict';

/* App Module */

var widgetApp = angular.module('widgetApp', [
    "chart.js",
    'ngStorage',
    'ngAnimate',
    'monospaced.mousewheel',
    "widgetDirectives",
    "widgetServices",
    "widgetControllers",
    "widgetFilters",
    "widgetAnimations"
])


widgetApp.run(function($q, $http) {

    var fpromise = $http.get("http://localhost.dz/Dropbox/Tempwork/ngpanels/app/data/emails.json")
    var k = 1



    var defferedResolve = function (data) {
        var deferred = $q.defer()
        deferred.resovle( data + "resolve deffered resolve ->")
        return deferred.promise
    }

    var defferedReject = function (data) {
        var deferred = $q.defer()
        deferred.reject( data + "reject deffered Reject ->")
        return deferred.promise
    }


    var qResolve = function(value) {
        var str = value
        var cb = function(resolve, reject) {
            var data = str + " resolve  qResolve ->"
            console.log(data)
            resolve(data)
        }
        return $q(cb)
    }

    var qReject = function(value) {
        var str = value
        var cb = function(resolve, reject) {
            var data = str + " reject  qReject  ->"
            console.log(data)
            reject(data)
        }
        return $q(cb)
    }


    var deferred = $q.defer()
    deferred.resolve("start") // is the same as q construct directly 
        //qpromise.then(
    deferred.promise.then(
        function(data) {
            data = data + " success dataA  ->"
            console.log(data)
            return data
        },
        function(data) {
            data = data + "'must use reject to call 2nd fn for reject handler  err dataA  ->"
            console.log(data)
            deferred.reject(data);
        }
    ).finally(
        function(data) {
            data = "in finally data should be undefined  -> " + data
            console.log(data)
                //return data  // return is not useful here 
        })


    //    .then(qReject, deferred.reject("rej"))


    //.then( function(d){ return qReject(d) } )  // = qRject(value)
    .then( qReject )  // equal upper 

    .catch(
        function(data) {
            var str = data + " an error catured ->"
            console.log(str)
            //return qReject(str)
            var deferred = $q.defer()
            deferred.reject(str)
            return deferred.promise  // it is better to return a promise 
        })

     .catch(
        function(data) {
            var str = data + " an error catured ->"
            console.log(str)
            return qReject(str)
        })

    .then(
        function(data) {
            var data = data + " successC ->"
            console.log(data)
            return data
        },
        function(data) {
            var data = data + " errC ->"
            console.log(data)
            var deferred = $q.defer();
            //deferred.reject("!!!!")
            return defferedReject(data)
        })

    .then(
        function(data) {
            var data = data + " successD ->"
            console.log(data)
            return data
        },
        function(data) {
            var data = data + " errD ->"
            console.log(data)
            var deferred = $q.defer();
            deferred.reject(data);
        })


})

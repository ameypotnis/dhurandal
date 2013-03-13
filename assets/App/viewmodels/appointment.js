define(function (require) {
    var http = require('durandal/http'),
        app = require('durandal/app');

    return {
        displayName: "Today's Appointment",
        appointment: ko.observableArray([]),

        searchText: ko.observable(""),
        results: ko.observableArray([]),

        activate: function () {
            //the router's activator calls this function and waits for it to complete before proceding
            var that = this;
            Date.prototype.yyyymmdd = function() {
                var yyyy = this.getFullYear().toString();
                var mm = (this.getMonth()+1).toString(); // getMonth() is zero-based
                var dd  = this.getDate().toString();
                return yyyy + (mm[1]?mm:"0"+mm[0]) + (dd[1]?dd:"0"+dd[0]); // padding
            };
            return http.get('http://localhost:3002/appointments/' + new Date().yyyymmdd(), {}, 'jsoncallback').then(function(response) {
                that.appointment(response.patients);
            });
        },
        search: function () {
            //the router's activator calls this function and waits for it to complete before proceding
            var that = this;

            return http.get('http://localhost:3002/patients/search/'+that.searchText(), {}, 'jsoncallback').then(function(response) {
                that.results(response);
            });
        },
        add: function (data) {
            data = {url: '#/patient?id=' + data._id, firstName: data.firstName, lastName: data.lastName };
            return http.put('http://localhost:3002/appointments/' + new Date().yyyymmdd(), data, 'jsoncallback').then(function(response) {
            });
        },
        newPatient: function (data) {
            alert(parent);
        }
    };
});
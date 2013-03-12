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
            that.appointment.push({"pid":1,"firstName":"Sam","lastName":"Pat"});

            /*return http.get('http://localhost:3002/appointments/20130311', {}, 'jsoncallback').then(function(response) {
                that.appointment(response);
            });*/
        },
        select: function(item) {
            //the app model allows easy display of modal dialogs by passing a view model
            //views are usually located by convention, but you an specify it as well with viewUrl
            item.viewUrl = 'views/detail';
            app.showModal(item);
        },
        canDeactivate: function () {
            //the router's activator calls this function to see if it can leave the screen
            return app.showMessage('Are you sure you want to leave this page?', 'Navigate', ['Yes', 'No']);
        },
        search: function () {
            //the router's activator calls this function and waits for it to complete before proceding
            var that = this;

            return http.get('http://localhost:3002/patients/search/'+that.searchText(), {}, 'jsoncallback').then(function(response) {
                that.results(response);
            });
        },
        add: function (data) {
           alert(parent);
        }
    };
});
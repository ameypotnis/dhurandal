define(function (require) {
    var http = require('durandal/http'),
        app = require('durandal/app');
    var blank = '';
    var URI = 'http://localhost:3002';

    return {
        displayName: "Patient",
        objectId : ko.observable(blank),
        firstName : ko.observable(blank),
        middleName : ko.observable(blank),
        lastName : ko.observable(blank),
        age : ko.observable(blank),
        sex : ko.observable(blank),
        maritalStatus : ko.observable(blank),

        complaint : ko.observable(blank),
        associatedComplaint : ko.observable(blank),
        histories : ko.observableArray(),

        activate: function () {
        var that = this;
        return http.get(URI + '/patients/5139c8dbb31efb391a000002', {}, 'jsoncallback').then(function(response) {
            that.objectId(response._id);
            that.firstName(response.firstName);
            that.middleName(response.middleName);
            that.lastName(response.lastName);
            that.age(response.age);
            that.sex(response.sex);
            that.maritalStatus(response.maritalStatus);
            that.histories(response.histories);
        });
    },
    add: function () {

        patient.viewUrl = 'views/detail';
        app.showModal(item);
    },
    addHistory : function() {
        this.histories.push({key: '', value: ''});
    },
    deleteHistory : function(item) {
        app.showMessage('Not yet implemented...');
    },
    saveHistory : function() {
        var data = {histories: this.histories()}

        jQuery.ajax({
            url: URI + "/patients/" + this.objectId(),
            data: data,
            type: "PUT",
            dataType: "json",
            success: function(data) {
                alert('History saved successfully');
            }
        });
    }
};
});
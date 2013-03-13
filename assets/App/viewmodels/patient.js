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

        complaint : ko.observable(),
        associatedComplaint : ko.observable(blank),
        histories : ko.observableArray([]),
        diagnosis : ko.observableArray([]),

        activate: function (input) {
            var that = this;
            return http.get(URI + '/patients/' + (input.id || ''), {}, 'jsoncallback').then(function(response) {
                that.objectId(response._id);
                that.firstName(response.firstName);
                that.middleName(response.middleName);
                that.lastName(response.lastName);
                that.age(response.age);
                that.sex(response.sex);
                that.maritalStatus(response.maritalStatus);
                that.histories(response.histories || []);
                that.diagnosis(response.diagnosis || []);
                that.complaint(response.complaint);
                that.associatedComplaint(response.associatedComplaint);
            });
        },
        addHistory : function() {
            this.histories.push({key: '', value: ''});
        },
        addDiagnosis : function() {
            this.diagnosis.push({key: '', value: ''});
        },
        saveInfo : function() {
            this.update({
                firstName: this.firstName(),middleName: this.middleName(),lastName: this.lastName(),
                age: this.age, sex: this.sex(), maritalStatus:this.maritalStatus()
            });
        },
        saveComplaint : function() {
            this.update({complaint: this.complaint, associatedComplaint: this.associatedComplaint});
        },
        saveHistory : function() {
            this.update({histories: this.histories()});
        },
        saveDiagnosis : function() {
            this.update({diagnosis: this.diagnosis()});
        },
        update : function(data) {
            jQuery.ajax({
                url: URI + "/patients/" + this.objectId(),
                data: data,
                type: "PUT",
                dataType: "json",
                success: function(data) {
                    alert('Information saved successfully');
                }
            });
        },
        deleteHistory : function(item) {
            alert(JSON.stringify(item));
            alert($);
        }
    };
});
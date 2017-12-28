import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

Meteor.startup(function() {

    // user roles
    var roles = ['member', 'banned', 'admin']

    // this will fail if the roles package isn't installed
    if (Meteor.roles.find().count() === 0) {
        roles.map(function(role) {
            Roles.createRole(role)
        })
    }

})

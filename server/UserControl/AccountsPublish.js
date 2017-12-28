import { Index, MinimongoEngine } from 'meteor/easy:search'
import { UsersIndex } from '../../lib/Indexes.js';

Meteor.publish("userDataProfile", function(user) {
	return Meteor.users.find({ username: user }, {
		fields: {
			createdAt: true,
			profile: true,
			emails: true,
			username: true,
			role: true
		}
	});
});

Meteor.publish('userList', function() {
	return Meteor.users.find({});
});

Meteor.publish("roles", function() {
	return Meteor.roles.find({});
});

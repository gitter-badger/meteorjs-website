import { Roles } from 'meteor/alanning:roles';

Accounts.validateNewUser(function(user) {
	if (!Roles.userIsInRole(user._id), 'member') {
		Roles.addUsersToRoles(user._id, 'member');
	}

	// L'adresse email est-elle valide ?
	if (
		// Ne fonctionne pas pour tout, mais relativement précise
		/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		.test(user.emails[0].address)
	) {
		return true;
	}
	else {
		throw new Meteor.Error(500, "Veuillez donner une adresse email valide");
	}
});

Accounts.onCreateUser((options, user) => {
	if (options.profile)
		user.profile = options.profile;

	Roles.addUsersToRoles(user._id, ['member']);
	return user;
});

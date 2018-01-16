import { Materialize } from 'meteor/materialize:materialize';

Template.login.events({
	"submit #login": function (event) {
		event.preventDefault();

		var user = $('#email').val();
		var password = $('#password').val();

		Meteor.loginWithPassword(user, password, function (err) {
			if (err) {
				Utils.ToastFieldError(err.reason);
			}
			else {
				Router.go('accueil');
			}
		});
	}
});

Template.login.onRendered(function () {
	Materialize.updateTextFields();
})

import { UsersIndex } from '../../../../lib/Indexes.js';
import { EasySearch } from 'meteor/easy:search';
import { Materialize } from 'meteor/materialize:materialize';

Template.admin_users.helpers({
	usersIndex: function () {
		return UsersIndex;
	},
	rolesList: function () {
		return Meteor.roles.find();
	},
	compareSelection: function (params1, params2) {
		let user = Meteor.users.findOne({ username: params1 });
		return Roles.userIsInRole(user, "member");
	},
	currentUserDisable: function (params1) {
		return Meteor.userId() == params1 || Meteor.users.find(params1).username == "Administrateur" /*|| Meteor.users.find(params1).roles == Meteor.userId().roles*/ ? 'disabled' : '';
	}
});

Template.admin_users.events({
	"click .delete_user_btn_admin": function (event) {
		Session.set('deleting_user', this._id);
		$('#delete_user_modal_admin').modal('open');
	},
	"click .update_user_btn_admin": function (event) {
		Session.set('updating_user', this._id);
		$('#update_user_modal_admin').modal('open');
	},
	"change #role": function (event) {
		if (this._id == Meteor.userId()) {
			Utils.ToastFieldError("Erreur: Vous n'avez pas le droit de changer vos propres permissions.");
			return;
		}

		try {
			Roles.setUserRoles(this._id, event.currentTarget.value);

			Utils.ToastFieldSucces("Rôle mis à jours");
		}
		catch (err) {
			Utils.ToastFieldError("Erreur: " + err);

		}
	}
});

Template.admin_users.onRendered(function () {
	$('.collapsible').collapsible();

	$('#delete_user_modal_admin, #update_user_modal_admin').modal({
		dismissible: true,
		ready: function () {
			$('#apply_user_delete_admin, #apply_user_update_admin').removeClass("disabled");
			Materialize.updateTextFields();
		}
	});
});

Template.delete_user_modal_admin.events({
	"keypress input": function (event) {
		if (event.keyCode == 13) {
			event.stopPropagation();
			$("#apply_user_edit").click();
			$('#delete_user_modal').modal('close');
		}
		else {
			event.stopPropagation();
			$('#delete_user_modal').modal('close');
		}
		Session.set('updating_user', null);
	},

	"click #apply_user_delete_admin": function () {
		$('#apply_user_delete_admin').addClass('disabled');
		Meteor.users.remove({ _id: Session.get('deleting_user') }, function (err) {
			if (err) {
				Utils.ToastFieldError("Erreur: " + err);
			}
			else {
				Utils.ToastFieldSucces("Compte supprimer");
			}
		});
	},
});

Template.delete_user_modal_admin.helpers({
	user: function () {
		return Meteor.users.findOne({ _id: Session.get('deleting_user') });
	}
});

Template.update_user_modal_admin.helpers({
	updating_user: function () {
		return Meteor.users.findOne({ _id: Session.get('updating_user') });
	}
});

Template.update_user_modal_admin.events({
	"click #apply_user_update_admin": function (event) {
		$('#apply_user_update_admin').addClass("disabled");
		let data = {
			username: $('input#username').val(),
			email: $('input#email').val(),
			profile: {
				firstName: $('input#firstName').val(),
				lastName: $('input#lastName').val(),
				birthDate: $('input#birthDate').val(),
			}
		};

		Meteor.users.update({ _id: Session.get('updating_user') }, {
				$set: {
					username: data.username,
					email: data.email,
					"profile.firstName": data.profile.firstName,
					"profile.lastName": data.profile.lastName,
					"profile.birthDate": data.profile.birthDate,
				}
			},
			function (err) {
				if (err) {
					Utils.ToastFieldError("Erreur: " + err);
				}
				else {
					Utils.ToastFieldSucces("Compte mis à jours");

				}
				Session.set('updating_user', null);
			}
		);
	},
});

Template.update_user_modal_admin.onRendered(function () {
	$(document).ready(function () {
		$('select').material_select();
	});

	Materialize.updateTextFields();

	$('.datepicker').pickadate({
		selectMonths: true,
		closeOnSelect: true,

		formatSubmit: 'dd mmm',
		format: 'dd mmmm',

		// First day of week (0: Sunday, 1: Monday etc)
		firstDay: 1,

		// Render the month after year in the calendar title
		showMonthAfterYear: false,

		// Render days of the calendar grid that fall in the next or previous month
		showDaysInNextAndPreviousMonths: true,

		clear: "Effacer",
		today: "Aujourd'hui",
		done: 'Ok',
		monthsFull: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
		monthsShort: ['Jan', 'Fév', 'Mars', 'Avril', 'Mai', 'Juin', 'Jul', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'],
		weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
		weekdaysFull: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
		weekdaysLetter: ['D', 'L', 'M', 'M', 'J', 'V', 'S']
	});
});

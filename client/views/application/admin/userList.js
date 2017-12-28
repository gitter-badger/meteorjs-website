import { UsersIndex } from '../../../../lib/Indexes.js';
import { EasySearch } from 'meteor/easy:search';

Template.admin_users.helpers({
	usersIndex: function() {
		return UsersIndex;
	},
	collapsible: function() {
		$('.collapsible').collapsible();
	}
});

Template.admin_users.events({
	"click .delete_user_btn_admin": function(event) {
		$('#delete_user_modal_admin').modal('open');
		Session.set('deleting_user', this._id);
	}
});

Template.admin_users.onRendered(function() {
	$('.collapsible').collapsible();

	$('#delete_user_modal_admin').modal({
		dismissible: true
	});
});

Template.delete_user_modal_admin.events({
	"click #apply_user_delete_admin": function() {
		Meteor.users.remove({ _id: Session.get('deleting_user') }, function(err) {
			if (err) {
				Utils.ToastFieldError("Erreur: " + err);
			}
			else {
				Utils.ToastFieldSucces("Compte supprimer");
			}
		});
	}
});

Template.delete_user_modal_admin.helpers({
	user: function() {
		return Meteor.users.findOne({ _id: Session.get('deleting_user') }).username;
	}
});

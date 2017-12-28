Template.register.events({
	"submit #register-step1": function(e) {
		e.preventDefault();

		let localUsername = $('#username').val();
		let localEmail = $('#email').val();
		let localPassword = $('#password').val();
		let localConfirme = $('#confirme').val();

		if (localUsername == "" || localEmail == "" || localPassword == "" || localConfirme == "") {
			if (localUsername == "") {
				Utils.ToastFieldError("Le nom d'utilisateur est vide.");
			}

			if (localEmail == "") {
				Utils.ToastFieldError("L'email est vide.");
			}

			if (localPassword == "") {
				Utils.ToastFieldError("Le mot de passe est vide.");
			}

			if (localConfirme == "") {
				Utils.ToastFieldError("La confirmation du mot de passe est vide.");
			}
		}
		else if (localPassword != localConfirme) {
			Utils.ToastFieldError("Les champs mot de passe et de confirmation ne correspondent pas.");
		}
		else {
			$("#register-step1").hide();
			$("#register-step2").show();
		}
	},

	"click #back": function(e) {
		e.preventDefault();
		$("#register-step1").show();
		$("#register-step2").hide();
	},

	"click #submit": function(e) {
		e.preventDefault();

		Accounts.createUser({
			username: $('#username').val(),
			email: $('#email').val(),
			password: $('#password').val().toString(),
			confirmPassword: $('#confirme').val(),
			profile: {
				firstName: $('#firstName').val(),
				lastName: $('#lastName').val(),
				birthDate: $('#birthDate').val(),
				gender: $('#gender').val()
			}
		}, function(err) {
			if (err) {
				Utils.ToastFieldError(err.reason)
			}
			else {
				Router.go('accueil');
			}
		});
	}
});

Template.register.onRendered(function() {
	$("#register-step1").show();
	$("#register-step2").hide();

	$(document).ready(function() {
		$('select').material_select();
	});

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

import { Materialize } from 'meteor/materialize:materialize';

Template.user_profile.events({
    "click #user_edit_btn": function () {
        $('#edit_user_modal').modal('open');
    },

    "click #delete_user_btn": function () {
        $('#delete_user_modal').modal('open');
    }
});

Template.user_profile.onRendered(function () {
    $('#edit_user_modal, #delete_user_modal').modal({
        dismissible: true
    });
});

Template.edit_user_modal.onRendered(function () {
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

Template.edit_user_modal.events({
    "keypress input": function (event) {
        if (event.keyCode == 13) {
            event.stopPropagation();
            $("#apply_user_edit").click();
            $('#edit_user_modal').modal('close');
        }
    },

    "click #apply_user_edit": function () {
        let data = {
            username: $('input#username').val(),
            email: $('input#email').val(),
            profile: {
                firstName: $('input#firstName').val(),
                lastName: $('input#lastName').val(),
                birthDate: $('input#birthDate').val(),
            }
        };
        Meteor.users.update({ _id: Meteor.userId() }, {
            $set: {
                username: data.username,
                email: data.email,
                "profile.firstName": data.profile.firstName,
                "profile.lastName": data.profile.lastName,
                "profile.birthDate": data.profile.birthDate,
            }
        }, function (err) {
            if (err) {
                Utils.ToastFieldError("Erreur: " + err);
            }
            else {
                Utils.ToastFieldSucces("Profile mis à jours avec succès");
            }
        });
    },
});


Template.delete_user_modal.events({
    "keypress #delete_user_modal input": function (event) {
        if (event.keyCode == 13) {
            event.stopPropagation();
            $("#apply_user_delete").click();
            $('#delete_user_modal').modal('close');
        }
    },

    "click #apply_user_delete": function () {
        Meteor.users.remove({ _id: Meteor.userId() }, function (err) {
            if (err) {
                Utils.ToastFieldError("Erreur: " + err);
            }
            else {
                Router.go("accueil");
                Utils.ToastFieldSucces("Compte supprimer");
            }
        });
    }
});

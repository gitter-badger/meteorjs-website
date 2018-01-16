Template.forum_categories.onRendered(function () {
    $('#add_categories_modal').modal({
        dismissible: true
    });
});

Template.forum_categories.events({
    "click #add_categories_btn": function () {
        $('#add_categories_modal').modal('open');
    }
});

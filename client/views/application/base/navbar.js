Template.navbar.onRendered(function() {
    $('.button-collapse').sideNav({
        closeOnClick: true,
        draggable: true
    });
});

Template.user_dropdow.onRendered(function() {
    $(".dropdown-button").dropdown({
        belowOrigin: true,
        constrainWidth: false,
    });
});

Template.user_dropdown_sidenav.onRendered(function() {
    $('.collapsible').collapsible();
})

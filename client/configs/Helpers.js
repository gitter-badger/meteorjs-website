UI.registerHelper('getGlobal', function(varName) {
    return Globals[varName];
});

UI.registerHelper('setTitle', function(title) {
    if (!title) {
        title = Globals.appName;
    }
    else {
        title += " · " + Globals.appName;
    }

    document.title = title;
});

UI.registerHelper('setProfileTitle', function(user_name) {
    let title;
    if (!user_name) {
        title = Globals.appName;
    }
    else {
        title = "Profile de " + user_name + " · " + Globals.appName;
    }

    document.title = title;
});

UI.registerHelper('formatDate', function(date) {
    return Utils.formatDate(date);
});

UI.registerHelper('compare', function(params1, params2) {
    return params1 == params2;
});

UI.registerHelper('different', function(params1, params2) {
    return params1 != params2;
});


UI.registerHelper('console', function(params1) {
    console.log(params1);
});

UI.registerHelper('isAdmin', function(params1) {
    return Roles.userIsInRole(params1, ['admin']);
});

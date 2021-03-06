Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loading',
});


Router.route('/', {
    name: 'accueil'
});


Router.route('/register', {
    name: "user.register",
    template: "register"
});
Router.route('/login', {
    name: "user.login",
    template: "login"
});
Router.route('/logout', {
    name: "user.logout",
    template: "user_logout",
    onBeforeAction: function () {
        this.next();
        Meteor.logout(function () {
            Router.go('/');
        });
    }
});
Router.route('/profile/:user', {
    name: "user.profile",
    template: "user_profile",
    data: function () {
        let user = Meteor.users.findOne({ username: this.params.user });
        return {
            res_user: user,
        }
    },
    waitOn: function () {
        return Meteor.subscribe("userDataProfile", this.params.user);
    },
    fastRender: true
});
Router.route('/profile', {
    name: "user.ownprofile",
    onBeforeAction: function () {
        this.next();
        Router.go('/profile/' + Meteor.user().username);
    },
});


Router.route('/admin', {
    name: "admin",
    waitOn: function () {
        return [Meteor.subscribe("roles")];
    },
    onBeforeAction: function () {
        if (Meteor.loggingIn() && Roles.userIsInRole(Meteor.userId(), 'admin')) {
            this.next();
            Router.go('admin.dashboard');
        }
        else {
            this.render("login");
        }
    },
});
Router.route('/admin/dashboard', {
    name: "admin.dashboard",
    template: "admin_dashboard",
    waitOn: function () {
        return [Meteor.subscribe("roles")];
    },
    onBeforeAction: function () {
        if (!Meteor.user()) {
            this.render("login");
        }
        else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
            this.render('accueil');
        }
        else {
            this.next();
        }
    },
});
Router.route('/admin/user-list', {
    name: "admin.users",
    template: "admin_users",
    waitOn: function () {
        return [Meteor.subscribe("roles"), Meteor.subscribe('userList')];
    },
    onBeforeAction: function () {
        if (!Meteor.user()) {
            this.render("login");
        }
        else if (!Roles.userIsInRole(Meteor.userId(), 'admin')) {
            this.render('accueil');
        }
        else {
            this.next();
        }
    },
});
Router.route('/admin/forum', {
    name: "admin.forum",
    template: "admin_forum",
});


Router.route('/forum/categories', {
    name: 'forum.categories',
    template: 'forum_categories',
    waitOn: function () {
        return [Meteor.subscribe("roles"), Meteor.subscribe('categoriesList')];
    },
    onBeforeAction: function () {
        if (Meteor.user()) {
            this.next();
        }
        else {
            this.render("user.login");
        }
    },
});
Router.route('/forum/categories/:categories', {
    name: 'forum.posts',
    template: 'forum_posts'
});
Router.route('/forum/view/:categoriesId/:postId', {
    name: "admin.view_post"
});

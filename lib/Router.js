Router.configure({
    layoutTemplate: 'mainLayout',
    loadingTemplate: 'loading',
});


Router.route('/', {
    name: 'accueil'
});
Router.route('/loading', {
    name: 'loading',
    template: Router.loadingTemplate,
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
    onBeforeAction: function() {
        this.next();
        Meteor.logout(function() {
            Router.go('/');
        });
    }
});
Router.route('/profile/:user', {
    name: "user.profile",
    template: "user_profile",
    data: function() {
        let user = Meteor.users.findOne({ username: this.params.user });
        return {
            res_user: user,
        }
    },
    waitOn: function() {
        return Meteor.subscribe("userDataProfile", this.params.user);
    },
    fastRender: true
});
Router.route('/profile', {
    name: "user.ownprofile",
    onBeforeAction: function() {
        this.next();
        Router.go('/profile/' + Meteor.user().username);
    },
});


Router.route('/admin', {
    name: "admin",
    waitOn: function() {
        return [Meteor.subscribe("roles")];
    },
    onBeforeAction: function() {
        if (Meteor.loggingIn() && Roles.userIsInRole(Meteor.userId(), 'admin')) {
            this.next();
            Router.go('admin.dashboard');
        }
        else {
            history.back();
        }
    },
});
Router.route('/admin/dashboard', {
    name: "admin.dashboard",
    template: "admin_dashboard",
    waitOn: function() {
        return [Meteor.subscribe("roles")];
    },
    onBeforeAction: function() {
        if (!Meteor.loggingIn() && !Roles.userIsInRole(Meteor.userId(), 'admin')) {
            history.back();
        }
        else {
            this.next();
        }
    },
});
Router.route('/admin/user-list', {
    name: "admin.users",
    template: "admin_users",
    waitOn: function() {
        return [Meteor.subscribe("roles"), Meteor.subscribe('userList')];
    },
    onBeforeAction: function() {
        if (!Meteor.loggingIn() && !Roles.userIsInRole(Meteor.userId(), 'admin')) {
            history.back();
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
});
Router.route('/forum/:categories', {
    name: 'forum.posts'
});
Router.route('/forum/:categoriesId/:postId', {
    name: "admin.view_post"
});

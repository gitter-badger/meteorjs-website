import { Index, MinimongoEngine } from 'meteor/easy:search'
// On Client and Server
const Users = Meteor.users;

export const UsersIndex = new Index({
    collection: Users,
    fields: [
        'username',
        'roles',
        'profile.firstName',
        'profile.lastName',
    ],
    engine: new MinimongoEngine(),
});

import { Index, MinimongoEngine } from 'meteor/easy:search'
import { UsersIndex } from '../../lib/Indexes.js';

Meteor.publish("categoriesList", function(user) {
	return Globals.schemas.Categories.find({});
});

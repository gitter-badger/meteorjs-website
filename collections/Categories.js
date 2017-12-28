Globals.schemas.Categories = new Mongo.Collection('categories');

Globals.schemas.Categories.attachSchema(new SimpleSchema({
    name: {
        type: String,
        label: "Nom"
    },
    id: {
        type: String,
        label: "Id"
    }
}));

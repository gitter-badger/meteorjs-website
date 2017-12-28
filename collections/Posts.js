Globals.schemas.Posts = new Mongo.Collection("articles");

// Création du schéma des articles
Globals.schemas.Posts.attachSchema(new SimpleSchema({
    title: {
        type: String,
        label: "Titre",
        max: 200
    },
    id: {
        type: String,
        label: "Id"
    },
    categories: {
        type: [String],
        label: "Catégories",
    },
    content: {
        type: String,
        label: "Contenu",
    },
    published: {
        type: Boolean,
        label: "Publication",
        optional: true
    },
    createdAt: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date;
            }
            else {
                this.unset();
            }
        }
    },
    lastUpdate: {
        type: Date,
        optional: true,
        autoValue: function() {
            if (this.isUpdate) {
                return new Date;
            }
            else {
                this.unset();
            }
        }
    },
    author: {
        type: String,
        autoValue: function() {
            if (this.isInsert) {
                return Meteor.userId();
            }
            else {
                this.unset();
            }
        }
    },
    noModif: { // Permet de savoir si un article a déjà été publié une fois ou non (Permet de définir s'il faut envoyer ou non des notifications)
        type: Boolean,
        autoform: {
            omit: true
        },
        autoValue: function() {

            if (this.isInsert) {
                if (this.field('published').value) {
                    return false;
                }
                return true;
            }
            else {
                var noModif = Globals.schemas.Posts.findOne(this.docId, { fields: { noModif: 1 } }).noModif;
                if (noModif === undefined) {
                    noModif = true;
                }

                if (this.field('published').isSet && this.field('published').value === true) {

                    return false;
                }
                else {
                    return noModif;
                }
            }

        }
    }

}));

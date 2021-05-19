// import module `mongoose`
const { ObjectID } = require('bson');
var mongoose = require('mongoose');

// defines the schema for collection `users`
var OrderSchema = new mongoose.Schema({
    client: {
        type: String,
        required: true
    },

    artist: {
        type: String,
        required: true,
    },

    artistid: {
        type: ObjectID,
        required: true,
    },

    email: {
        type: String,
        required: true
    },

    status: {
        type: String,
        required: true,
        default: 'outgoing'
    },

    reviewStatus: {
        type: Boolean,
        required: true,
        default: false
        //0 means no review and 1 means there is a review
    },

    description: {
        type: String,
        required: true,
        default: 'null'
    },

    stars: {
        type: Number,
        required: true,
        default: 0
    },
    offer: {
        type: Number,
        required: true,
        default: 0
    },
    review: {
        type: String,
        required: true,
        default: 'null'
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('Order', OrderSchema);

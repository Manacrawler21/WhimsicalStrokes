
// import module `mongoose`
var mongoose = require('mongoose');

// defines the schema for collection `users`
var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },

    pw: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    shopOpen: {
        type: Boolean,
        required: true,
        default: false
    },

    description: {
        type: String,
        required: true,
        default: 'null'
    },

    productname: {
        type: String,
        required: true,
        default: 'null'
    },

    stars: {
        type: Number,
        required: true,
        default: 5
    },
    starvalue: {
        type: Number,
        required: true,
        default: 0
    },
    reviewNum: {
        type: Number,
        required: true,
        default: 0
    },
    minPrice: {
        type: Number,
        required: true,
        default: 0
    },
    pfp:{
        type: String,
        required: true,
        default: 'd'
    },
    bg:{
        type: String,
        required: true,
        default: 'd'
    },
    cs:{
        type: String,
        required: true,
        default: 'd'
    }
});

/*
    exports a mongoose.model object based on `UserSchema` (defined above)
    when another script exports from this file
    This model executes CRUD operations
    to collection `users` -> plural of the argument `User`
*/
module.exports = mongoose.model('User', UserSchema);

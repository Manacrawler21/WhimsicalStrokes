
// import module `validationResult` from `express-validator`
const { validationResult } = require('express-validator');

// import module `bcrypt`
const bcrypt = require('bcrypt');
const saltRounds = 10;

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');



const registerController = {

    getRegister: function (req, res) {
        if(req.session.username){
            res.redirect('/');
        }else{
        res.render('Register');}
    },

    postRegister: function (req, res) {

        // checks if there are validation errors
        var errors = validationResult(req);

        // if there are validation errors
        if (!errors.isEmpty()) {

            // get the array of errors
            errors = errors.errors;

            /*
                for each error, store the error inside the object `details`
                the field is equal to the parameter + `Error`
                the value is equal to `msg`
                as defined in the validation middlewares

                for example, if there is an error for parameter `fName`:
                store the value to the field `fNameError`
            */
            var details = {};
            for(i = 0; i < errors.length; i++)
                details[errors[i].param + 'Error'] = errors[i].msg;

            /*
                render `../views/signup.hbs`
                display the errors defined in the object `details`
            */
            res.render('Register', details);
        }
        else{
            var username = req.body.username;
            var pw = req.body.pw;
            var email = req.body.email;


            bcrypt.hash(pw, saltRounds, function(err, hash){
                var user = {
                username: username,
                pw: hash,
                email: email
            }

                var query = {username:username};
                var projection = 'username';
                db.findOne(User, query, projection, function(result) {

                    /*
                        if the user exists in the database, register new user in database
                    */
                    if(result == null) {

                        db.insertOne(User, user, function(flag) {
                            if(flag) {
                                //redirects to registered user's home page
                                req.session.username = username;
                                res.redirect('/');
                            }
                        });
                    }
                    else{
                        res.redirect('/Register');
                    }
                });
            });  

        }
        
    },
    getCheckUsername: function (req, res) {

        var username = req.query.username;

        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);
        });
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = registerController;

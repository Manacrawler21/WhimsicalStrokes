const { validationResult } = require('express-validator');
// import module `bcrypt`
const bcrypt = require('bcrypt');

// import module `database` from `../models/db.js`
const db = require('../models/db.js');
//const session = require('express-session');
// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

const loginController = {

    getLogin: function (req, res) {
        if(req.session.username){
            res.redirect('/');
        }
        else{
        res.render('Login');}
    },

    
    postLogin: function (req, res) {

        var errors = validationResult(req);
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
            res.render('Login', details);
        }
        else{
        var username = req.body.username;
        var pw = req.body.pw;
        var query = {username:username};
        var projection = 'username pw';
            db.findOne(User, query, projection, function(result) {

                /*
                    if the user exists in the database register new user in database
                */
                if(result != null) {
                    /*
                    if(pw==result.pw) {
                        //redirects to registered user's home page
                        res.redirect('/'+username+'/home');
                    }*/

                    bcrypt.compare(pw, result.pw, function(err, equal){
                        if (equal) {
                            //redirects to registered user's home page
                        //console.log(req.body.username);
                        req.session.username = username;
                        //console.log(req.session.username);
                        res.redirect('/');
                        }
                        else{
                            var detail = {
                                error: 'Incorrect Password'
                            }
                            res.render('Login',detail);
                        }

                    });


                }
                else{
                    var detail = {
                                error: 'Incorrect Password'
                    }
                    res.render('Login',detail);
                }
            });
    }
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = loginController;

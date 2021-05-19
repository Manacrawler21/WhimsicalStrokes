
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const Order = require('../models/OrderModel.js');
const session = require('express-session');

const shopController = {

    getShop: function (req, res) {
        
        if(req.session.username){
            var query = {username: req.param('shopowner')};
        var projection = 'username productname description stars pfp bg cs minPrice _id';
        db.findOne(User, query, projection, function(result) {

            /*
                if the user exists in the databasem register new user in database
            */
            if(result != null) {

               
                if(req.session.username == req.param('shopowner'))
                {
                    var info={
                        username: req.session.username,
                        shopowner: req.param('shopowner'),
                        productname: result.productname,
                        description: result.description,
                        author:true,
                        stars: result.stars,
                        pfp: result.pfp,
                        bg: result.bg,
                        cs: result.cs,
                        minPrice: result.minPrice
                    }
                    var query = {artistid: result._id, 
                        reviewStatus: true};
                    var projection = 'client stars review';
                    db.findMany(Order, query, projection, function(result) {
                        info.reviews = result;
                        //res.render('Shop',info);
                    });

                    var query = {username:req.session.username};
                    var projection = 'pfp';
                    db.findOne(User,query,projection,function(result){
                        if(result != null){
                            info.prof = result.pfp;  
                            res.render('Shop',info);
                        }
                        else{
                            info.prof = 'd';
                            res.render('Shop',info);
                        }
                    });
                    
                }
             
                else{
                    var info ={
                        username: req.session.username,
                        shopowner: req.param('shopowner'),
                        productname: result.productname,
                        description: result.description,
                        stars: result.stars,
                        pfp: result.pfp,
                        bg: result.bg,
                        cs: result.cs,
                        minPrice: result.minPrice
                    }
                    var query = {artistid: result._id, 
                        reviewStatus: true};
                    var projection = 'client stars review';
                    db.findMany(Order, query, projection, function(result) {
                        if(result != null){
                        info.reviews = result;}
                        //res.render('Shop',info);
                    });  
                    var query = {username:req.session.username};
                    var projection = 'pfp';
                    db.findOne(User,query,projection,function(result){
                        if(result != null){
                            info.prof = result.pfp;
                            res.render('Shop',info);
                        }
                        else{
                            info.prof = 'd';
                            res.render('Shop',info);
                        }
                    });
                    
                }

            }
            else{
                res.redirect('/');
            }
        });
            
        }
        else{
            var query = {username: req.param('shopowner')};
            var projection = 'username productname description pfp bg cs stars minPrice _id';

            db.findOne(User, query, projection, function(result) {

            /*
                if the user exists in the databasem register new user in database
            */
            if(result != null) {

                var info ={
                    shopowner: result.username,
                    productname: result.productname,
                    description: result.description,
                    stars: result.stars,
                    pfp: result.pfp,
                    bg: result.bg,
                    cs: result.cs,
                    minPrice: result.minPrice
                }

                var query = {artistid: result._id, 
                    reviewStatus: true};
                var projection = 'client stars review';
                db.findMany(Order, query, projection, function(result) {
                    info.reviews = result;
                    res.render('Shop',info);
                
                })   
            }
            else{
                res.redirect('/');
            }
        });}

        
    },

    order: function (req, res) {
        if(req.session.username){
        var client = req.session.username;
        var artist = req.param('shopowner');
        var description = req.body.review;
        var offer = req.body.offer;

        var query = {username:client};
        var projection = 'email';

        

        db.findOne(User,query,projection,function(result){
            var OrderOb = {
                client: client,
                artist: artist,
                description: description,
                offer: offer,
                email: result.email
            }

            var query = {username:artist};
            var projection = '_id';
            db.findOne(User,query,projection,function(result){ OrderOb.artistid = result._id
            db.insertOne(Order, OrderOb, function(flag) {
                if(flag) {
                    //redirects to registered user's home page
                    res.redirect('/shop/'+artist);
                    }
                });
            }); 
        })
        }
        else{
            res.redirect('/login');
        }
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = shopController;


// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');

/*
    defines an object which contains functions executed as callback
    when a client requests for `index` paths in the server
*/
const controller = {
    /*getFavicon: function (req, res) {
        res.status(204);
    },*/

    /*
        executed when the client sends an HTTP GET request `/`
        as defined in `../routes/routes.js`
    */
    getIndex: function (req, res) {

        // render `../views/index.hbs`
        if(req.session.username)
        {
        var p ={user:req.session.username};
        var query = {username:req.session.username};
        var projection = 'pfp'
        db.findOne(User,query,projection,function(result){
            if(result != null){
                p.prof = result.pfp;}
            else{
                p.prof = 'd';}
        });
        var query = {shopOpen:true};
        var projection = 'username description productname stars minPrice pfp bg cs'
        db.findMany(User,query,projection,function(result){
            p.results = result;
            res.render('index',p);    
        })}
        else{
        req.session.username = null;
        var p ={nouser:true};
        var query = {shopOpen:true};
        var projection = 'username description productname stars minPrice pfp bg cs'
        db.findMany(User,query,projection,function(result){
            p.results = result;
            res.render('index',p);    
        })}
        

    },
    /*getIndexUser: function (req, res) {

        // render `../views/index.hbs`
        var p ={user:req.param('username')};
        var query = {username:req.param('username')};
        var projection = 'pfp'
        db.findOne(User,query,projection,function(result){
            if(result != null){
                p.prof = result.pfp;}
            else{
                p.prof = 'd';}
        });
        var query = {shopOpen:true};
        var projection = 'username description productname stars minPrice pfp bg cs'
        db.findMany(User,query,projection,function(result){
            p.results = result;
            res.render('index',p);    
        })
    },*/

    search: function(req, res){
        if(req.session.username)
        {var p ={user:req.session.username};
        var query = {username:req.session.username};
        var projection = 'pfp'
        db.findOne(User,query,projection,function(result){
            if(result != null){
                p.prof = result.pfp;}
            else{
                p.prof = 'd';}
        });
        var q = ".*"+req.query.search+".*"
        var query = {shopOpen:true, productname: {$regex: q, $options: 'i'}};
        var projection = 'username description productname stars minPrice pfp bg cs'
        db.findMany(User,query,projection,function(result){
            p.results = result;
            res.render('index',p);    
        })}
        else{
        var p ={nouser:true};
        var q = ".*"+req.query.search+".*"
        var query = {shopOpen:true, productname: {$regex: q, $options: 'i'}};
        var projection = 'username description productname stars minPrice pfp bg cs'
        db.findMany(User,query,projection,function(result){
            p.results = result;
            res.render('index',p);    
        })}
    }, 

    /*searchUser: function(req, res){
        var p ={user:req.param('username')};
        var query = {username:req.param('username')};
        var projection = 'pfp'
        db.findOne(User,query,projection,function(result){
            if(result != null){
                p.prof = result.pfp;}
            else{
                p.prof = 'd';}
        });
        var q = ".*"+req.query.search+".*"
        var query = {shopOpen:true, productname: {$regex: q, $options: 'i'}};
        var projection = 'username description productname stars minPrice pfp bg cs'
        db.findMany(User,query,projection,function(result){
            p.results = result;
            res.render('index',p);    
        })
    } */
}

/*
    exports the object `controller` (defined above)
    when another script exports from this file
*/
module.exports = controller;


// import module `database` from `../models/db.js`
const db = require('../models/db.js');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const session = require('express-session');

const shopeditorController = {

    getShopeditor: function (req, res) {
        var info ={
            username: req.session.username
        }
        
        var query = {username:req.session.username};
        var projection = 'pfp'
        db.findOne(User,query,projection,function(result){
            if(result != null){
                info.prof = result.pfp;
                res.render('Shopeditor',info);
            }
            else{
                info.prof = 'd';
                res.render('Shopeditor',info);
            }
        })
        
    },

    updateInfo: function(req, res){
        db.findOne(User,{username: req.body.username},'username', function(result){
           if(result == null || result.username == req.session.username){
            var update = { 
                username: req.body.username.trim(),
                productname: req.body.userproduct
            };
    
            var filter = {username:req.session.username};
    
            req.session.username = req.body.username;
    
            db.updateOne(User,filter,update);
    
            res.redirect('/edit');
           }
           else {
            var info ={
                username: req.session.username,
                error: "username is taken, please try another."
            }
            
            var query = {username:req.session.username};
            var projection = 'pfp'
            db.findOne(User,query,projection,function(result){
                if(result != null){
                    info.prof = result.pfp;
                    res.render('Shopeditor',info);
                }
                else{
                    info.prof = 'd';
                    res.render('Shopeditor',info);
                }
            })
           } 
        })
        
        
    },

    updatePassword: function(req, res){
        bcrypt.hash(req.body.pw, saltRounds, function(err, hash){
            var update = { 
            pw: hash
            };
            var filter = {username:req.session.username};

        db.updateOne(User,filter,update);

        res.redirect('/edit');
        });
        
    },
    updateDesc: function(req, res){
        var update = { 
            description: req.body.desc
        };

        var filter = {username:req.session.username};

        db.updateOne(User,filter,update);

        res.redirect('/edit');
    },
    updatePrice: function(req, res){
        var update = { 
            minPrice: req.body.price
        };

        var filter = {username:req.session.username};

        db.updateOne(User,filter,update);

        res.redirect('/edit');
    },
    openShop: function(req, res){
        var update = { 
            shopOpen: true
        };

        var filter = {username:req.session.username};

        db.updateOne(User,filter,update);

        res.redirect('/edit');
    },
    closeShop: function(req, res){
        var update = { 
            shopOpen: false
        };

        var filter = {username:req.session.username};

        db.updateOne(User,filter,update);

        res.redirect('/edit');
    },
    updatePFP: function(req, res){
        /*var newPath = "public/uploads/"+req.param('username')+"pfp.png";
        fs.renameSync("public/uploads/pfp.png",newPath);*/
        var update = { 
            pfp: req.session.username+"pfp"
        };

        var filter = {username:req.session.username};

        db.updateOne(User,filter,update);

        res.redirect('/edit');
    }
    ,
    updateBG: function(req, res){
        //var newPath = "public/uploads/"+req.param('username')+"bg.png";
        //fs.renameSync("public/uploads/bg.png",newPath);
        var update = { 
            bg: req.session.username+"bg"
        };

        var filter = {username:req.session.username};

        db.updateOne(User,filter,update);
        res.redirect('/edit');
    }
    ,
    updateCS: function(req, res){
        //var newPath = "public/uploads/"+req.param('username')+"cs.png";
        //fs.renameSync("public/uploads/cs.png",newPath);
        var update = { 
            cs: req.session.username+"cs"
        };

        var filter = {username:req.session.username};

        db.updateOne(User,filter,update);
        res.redirect('/edit');
    }
    ,
    deleteAcc: function(req, res){
        var conditions = {username:req.session.username};
        db.deleteOne(User,conditions);
        res.redirect('/logout');
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = shopeditorController;

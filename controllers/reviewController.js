
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const Order = require('../models/OrderModel.js');

const reviewController = {

        getReview: function (req, res) {
        var id = req.param('OID');
        //res.write('hello world');
        var p = {user:req.session.username, 
                id: id,
                link: "addreview"
            };
        var query = {username:req.session.username,
        
        };
        var projection = 'pfp';
        db.findOne(User,query,projection,function(result){
            if(result != null){
                p.prof = result.pfp;
                res.render('Review',p);
            }
            else{
                p.prof = 'd';
                res.render('Review',p);
            }
        });
    },

    editReview: function (req, res) {
        var id = req.param('OID');
        var p = {user:req.session.username, 
                id: id,
                link: "editreviewstars"
            };
        
        var query = {_id: id
        };
        var projection = 'review stars';
        
        db.findOne(Order,query,projection,function(result){

            p.review = result.review,
            p.stars = result.stars
        });
    
        
        var query = {username:req.session.username
        };
        var projection = 'pfp';
        
        db.findOne(User,query,projection,function(result){
            if(result != null){
                p.prof = result.pfp;
                res.render('Review',p);
            }
            else{
                p.prof = 'd';
                res.render('Review',p);
            }
        });
    },

    addReview: function (req, res) {
        
        var stars = req.body.stars;
        var query = {
            _id:req.param('OID')
        } 
        var projection = 'artistid'
        db.findOne(Order,query,projection,function(result){
            
            var artist = result.artistid;
            var query = {_id: result.artistid};
            projection = 'starvalue reviewNum'
            db.findOne(User, query, projection, function(result){
                
                var currentstars = +result.starvalue + +stars;
                var newtotal = result.reviewNum+1;
                if(newtotal != 1)
                    {var currentrating = Math.ceil(currentstars/newtotal);}
                else if (newtotal == 1)
                    {
                        var currentrating = currentstars;
                    }
                var update ={
                    stars: currentrating,
                    starvalue: currentstars,
                    reviewNum: newtotal,
                    //artist: artist
                }
                var filter = {_id: artist}
                db.updateOne (User,filter,update);
                var update = { 
                    review: req.body.review,
                    stars: req.body.stars,
                    reviewStatus: true
                };
        
                var filter = {_id:req.param('OID')};
        
                db.updateOne(Order,filter,update);
                res.redirect('/orders');
                
            })
            
        })

        
    },
    editReviewStars: function (req, res) {
        
        var stars = req.body.stars;
        var query = {
            _id:req.param('OID')
        } 
        var projection = 'artistid stars'
        db.findOne(Order,query,projection,function(result){
            
            var artist = result.artistid;
            var origStar = result.stars;
            var query = {_id: result.artistid};
            projection = 'starvalue reviewNum'
            db.findOne(User, query, projection, function(result){
                
                var currentstars = +result.starvalue + +stars - +origStar;
                var newtotal = result.reviewNum;
                var currentrating = Math.ceil(currentstars/newtotal);
                var update ={
                    stars: currentrating,
                    starvalue: currentstars,
                    reviewNum: newtotal,
                    //artist: artist
                }
                var filter = {_id: artist}
                db.updateOne (User,filter,update);
                var update = { 
                    review: req.body.review,
                    stars: req.body.stars,
                    reviewStatus: true
                };
        
                var filter = {_id:req.param('OID')};
        
                db.updateOne(Order,filter,update);
                res.redirect('/orders');
                
            })
            
        })

        
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = reviewController;
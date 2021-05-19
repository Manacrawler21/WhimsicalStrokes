
// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const Order = require('../models/OrderModel.js');

const ordersController = {

        getOrders: function (req, res) {
        var p ={user:req.session.username};

        var query = {client:req.session.username,
                     status: "outgoing"};
        var projection = 'artist description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultOutgoing = result;
        });
        
        var query = {client:req.session.username,
                     status: "accepted"
        };
        //var projection = 'client description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultAccepted = result;   
        });

        var query = {client:req.session.username,
                     status: "rejected"
        };
        //var projection = 'client description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultRejected = result; 
        });

        var query = {client:req.session.username,
                     status: "completed",
                    reviewStatus: false
        };
        //var projection = 'client description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultCompletedUnreviewed = result;  
        });

        var query = {client:req.session.username,
                     status: "completed",
                    reviewStatus: true
        };
        //var projection = 'client description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultCompletedReviewed = result;  
        });

        var query = {username:req.session.username};
        var projection = 'pfp';
        db.findOne(User,query,projection,function(result){
            if(result != null){
                p.prof = result.pfp;
                res.render('Orders',p);
            }
            else{
                p.prof = 'd';
                res.render('Orders',p);
            }
        });
        
    },

    deleteReview: function (req, res) { 
        var query = {
            _id:req.param('OID')
        } 
        var projection = 'artistid stars'
        db.findOne(Order,query,projection,function(result){
            
            var artistid = result.artistid;
            var origStar = result.stars;
            var query = {_id: result.artistid};
            projection = 'starvalue reviewNum'
            db.findOne(User, query, projection, function(result){
                
                var currentstars = +result.starvalue - +origStar;
                var newtotal = result.reviewNum-1;
                if (newtotal>0){
                    var currentrating = Math.ceil(currentstars/newtotal);}
                else{
                    newtotal = 0;
                    var currentrating = 5;
                }
                var update ={
                    stars: currentrating,
                    starvalue: currentstars,
                    reviewNum: newtotal,
                    //artist: result.username
                }
               // res.render('testvar', update);
               var filter = {_id: artistid}
               db.updateOne (User,filter,update);

               var update = { 
                    reviewStatus: false,
                    stars: 0,
                    review: "null"
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
module.exports = ordersController;

// import module `database` from `../models/db.js`
const db = require('../models/db.js');

// import module `User` from `../models/UserModel.js`
const User = require('../models/UserModel.js');
const Order = require('../models/OrderModel.js');
const commissionsController = {

    getCommissions: function (req, res) {
        var p ={user:req.session.username};

        var query = {artist:req.session.username,
                     status: "outgoing"};
        var projection = 'client description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultOutgoing = result;
        });
        
        var query = {artist:req.session.username,
                     status: "accepted"
        };
        //var projection = 'client description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultAccepted = result;   
        });

        var query = {artist:req.session.username,
                     status: "completed"
        };
        //var projection = 'client description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultCompleted = result;  
        });

        var query = {artist:req.session.username,
                     status: "rejected"
        };
        //var projection = 'client description _id offer email'
        db.findMany(Order,query,projection,function(result){
            p.resultRejected = result; 
        });

        var query = {username:req.session.username};
        var projection = 'pfp';
        db.findOne(User,query,projection,function(result){
            if(result != null){
                p.prof = result.pfp;
                res.render('Commissions',p);
            }
            else{
                p.prof = 'd';
                res.render('Commissions',p);
            }
        });
    },

    acceptOrder: function (req, res) { var update = { 
            status:"accepted"
        };

        var filter = {_id:req.param('OID')};

        db.updateOne(Order,filter,update);
        res.redirect('/commissions');
    },

    rejectOrder: function (req, res) { var update = { 
           status:"rejected"
        };

        var filter = {_id:req.param('OID')};

        db.updateOne(Order,filter,update);
        res.redirect('/commissions');
    },

    completeOrder: function (req, res) { var update = { 
          status:"completed"
        };

        var filter = {_id:req.param('OID')};

        db.updateOne(Order,filter,update);
        res.redirect('/commissions');
    }
}

/*
    exports the object `signupController` (defined above)
    when another script exports from this file
*/
module.exports = commissionsController;

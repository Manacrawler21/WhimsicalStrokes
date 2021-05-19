
// import module `express`
const express = require('express');

// import module `hbs`
const hbs = require('hbs');

// import module `routes` from `./routes/routes.js`
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

const routes = require('./routes/routes.js');


// import module for multer to process multi-part files
const multer = require('multer');
// import module `database` from `./model/db.js`
const db = require('./models/db.js');


const app = express();
const port = process.env.PORT || 3000;


app.set('view engine', 'hbs');
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));




app.use(session({
    'secret': 'ccapdev-session',
    'resave': false,
    'saveUninitialized': false,
    store: new MongoStore({mongooseConnection: mongoose.connection})
}));
app.use('/', routes);



app.use(function (req, res) {
    res.render('error');
});

db.connect();

hbs.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

app.listen(port, function () {
    console.log('app listening at port ' + port);
});

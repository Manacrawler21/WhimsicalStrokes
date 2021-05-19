
// import module `express`
const express = require('express');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/uploads')
    },
    filename: (req, file, cb) => {
        const { originalname } = file;
        // or 
        // uuid, or fieldname
        cb(null, file.fieldname+'.png');
    }
})
const upload = multer({ storage }); // or simply { dest: 'uploads/' }
//const upload = multer({dest:'uploads/'});
// import controllers
const controller = require('../controllers/controller.js');
const registerController = require('../controllers/registerController.js');
const loginController = require('../controllers/loginController.js');
const shopController = require('../controllers/shopController.js');
const shopeditorController = require('../controllers/shopeditorController.js');
const commissionsController = require('../controllers/commissionsController.js');
const ordersController = require('../controllers/ordersController.js');
const reviewController = require('../controllers/reviewController.js');
const validation = require('../helper/validation.js');
const logoutController = require('../controllers/logoutController.js');
const app = express();

app.get('/', controller.getIndex);
//app.get('/:username/home', controller.getIndexUser);

app.get('/search', controller.search);
//app.get('/:username/search', controller.searchUser);

app.get('/Register', registerController.getRegister);
//app.post('/Register', registerController.postRegister);
app.post('/Register', validation.registerValidation(), registerController.postRegister);
app.get('/getCheckUsername',registerController.getCheckUsername);


app.get('/Login', loginController.getLogin);
//app.post('/Login', loginController.postLogin);
app.post('/Login', validation.loginValidation(), loginController.postLogin);

app.get('/shop/:shopowner', shopController.getShop);
app.post('/order/:shopowner', shopController.order);

app.get('/edit',shopeditorController.getShopeditor);
app.post('/edit/updateInfo',shopeditorController.updateInfo);
app.post('/edit/updatePassword',shopeditorController.updatePassword);
app.post('/edit/updateDesc',shopeditorController.updateDesc);
app.post('/edit/closeShop',shopeditorController.closeShop);
app.post('/edit/openShop',shopeditorController.openShop);
app.post('/edit/updatePrice',shopeditorController.updatePrice);
app.post('/edit/deleteAcc',shopeditorController.deleteAcc);
app.post('/edit/updatePFP', upload.any(),shopeditorController.updatePFP);
app.post('/edit/updateBG', upload.any(),shopeditorController.updateBG);
app.post('/edit/updateCS', upload.any(),shopeditorController.updateCS);

app.get('/commissions', commissionsController.getCommissions);
app.get('/accept/:OID', commissionsController.acceptOrder);
app.get('/reject/:OID', commissionsController.rejectOrder);
app.get('/complete/:OID', commissionsController.completeOrder);

app.get('/orders', ordersController.getOrders);
app.get('/deletereview/:OID', ordersController.deleteReview);


app.get('/review/:OID', reviewController.getReview);
app.get('/editreview/:OID', reviewController.editReview);
app.post('/editreviewstars/:OID', reviewController.editReviewStars);
app.post('/addreview/:OID', reviewController.addReview);

app.get('/logout', logoutController.getLogOut);

module.exports = app;

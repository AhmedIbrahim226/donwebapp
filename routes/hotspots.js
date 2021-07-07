const express = require("express");
const router = express.Router();
const firebase = require('firebase');



router.get("/", (req, res) => {
    
    res.render('hotspots');
})





router.post('/', (req, res) => {

    var blood = req.body.blood;
    var amount = req.body.amount;
    var reason = req.body.reason;

    var user = firebase.auth().currentUser;
    var uid = user.uid; 
    
})
module.exports = router;
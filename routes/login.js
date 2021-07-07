const express = require("express");
const router = express.Router();
const firebase = require('firebase');

// Login
router.get("/", (req, res) => {
  res.render('login');
  });

router.post("/", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;
  
    firebase.auth().signInWithEmailAndPassword(email, password).then((userCredntial)=>{
      res.redirect("/em");
    }).catch((error) => {
      var errorMessage = error.message;
      res.render('login',{error: errorMessage});
    })
  });
module.exports = router;

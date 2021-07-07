const express = require("express");
const router = express.Router();
const firebase = require('firebase');
const admin = require("firebase-admin");


router.get("/", (req, res ) => {

    firebase.auth().onAuthStateChanged(userCredntial => {
        const user = firebase.auth().currentUser;
        admin.auth().getUser(userCredntial.uid).then((userRecord) => {
            const em = userRecord.email;
            res.render('emailApass', {em: em});
            console.log("lastemail", user.email)
        });
    });
})



router.post("/", (req, res ) => {

    var pass1 = req.body.pass;
    var mail1 = req.body.mail;

    var user = firebase.auth().currentUser;

    var credential = firebase.auth.EmailAuthProvider.credential(user.email, pass1);

    user.reauthenticateWithCredential(credential).then((data) => {
        user.updateEmail(mail1).then(() => {
            console.log("newemail",user.email)
            user.sendEmailVerification()
        })
        res.redirect("/login");
    }).catch((error) => {
        var errorMessage = error.message;
        res.render('emailApass', {err1: errorMessage})
    })
})























// router.post("/", (req, res ) => {

//     const pass1 = req.body.pass;
//     const mail1 = req.body.mail;

//     const password = req.body.password1;
//     const confirmpassword = req.body.confirmpassword;

//     var dict = {};

//     firebase.auth().onAuthStateChanged(userCredntial => {
//         const user = firebase.auth().currentUser;
//         const em = userCredntial.email;
//         firebase.auth().signInWithEmailAndPassword(em, pass1).then((userCredential) => {
//             userCredential.user.updateEmail(mail1);
//             dict.sended = `We have sent you the link to your new email ${mail1}, please check the email`
//         }).catch((error) => {
//             var errorMessage = error.message;
//             dict.err1 = errorMessage
//         })

//         var emailVerified = user.emailVerified;
//         if (emailVerified === true){
//             if (password.length >= 6 && confirmpassword == password){
//                 admin.auth().updateUser(userCredntial.uid, {
//                     password: password,
//                     disabled: false,              
//                     });
//                     res.redirect('/login');
//             }else{
//                 dict.errpas = "Incorrect Password"
//             }
//         }else{
//             dict.VE = "Please Verified the email"
//             user.sendEmailVerification()
//             dict.VERIFI = "send to email for verification"
//         }
//      res.render('emailApass', dict)
//     })
// })
module.exports = router;
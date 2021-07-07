const express = require("express");
const router = express.Router();
const firebase = require('firebase');
const admin = require("firebase-admin");



// Edit Profile
router.get("/", (req, res) => {
    firebase.auth().onAuthStateChanged(userCredntial => {
      var dict = {};
      firebase.firestore().collection("users").doc(userCredntial.uid).get().then((querySnapshot) =>{
        const nm = querySnapshot.data().name;
        const nid = querySnapshot.data().national_id;
        const ag = querySnapshot.data().age;
        const ad = querySnapshot.data().address;
        const don = querySnapshot.data().can_donate;
        dict.n = nm;
        dict.ad = ad;
        dict.nid = nid;
        dict.ag = ag;
        dict.don = don;

        console.log(dict);
        res.render('profile', dict);
      });
    });
  });

router.post("/", (req, res) => {
    const age = req.body.age1;
    const username = req.body.username1;
    const NatId = req.body.NatId1;
    const address = req.body.address1;
    var blood = req.body.blood;
    var gender = req.body.gender

    const cancer = req.body.cancer;
    const cardiac = req.body.Cardiac;
    const lungdisease = req.body.lungdisease;
    const hepatitisBandC = req.body.hepatitisBandC;
    const HIVinfaction = req.body.HIVinfaction;
    const AIDSorSexually = req.body.AIDSorSexually;
    const Chronicalcoholism = req.body.Chronicalcoholism;
    const Pregnancy = req.body.Pregnancy;
    const Acutefever = req.body.Acutefever;
    const Earorbody = req.body.Earorbody;
  
    firebase.auth().onAuthStateChanged(userCredntial => {
      if (!age || !username || !NatId || !address || !blood || !gender ){
        res.render('profile', {error: "Are you sure you have entered all the data?"})
      }else{
        var cand = true;
        if ( cancer ||  cardiac || lungdisease || hepatitisBandC || HIVinfaction || AIDSorSexually || Chronicalcoholism || Pregnancy || Acutefever ||Earorbody ){
          cand = false;
        }
        else{
          cand
        };
        firebase.firestore().collection("users").doc(userCredntial.uid).update({
          address: address,
          age: age,
          name: username,
          national_id: NatId,
          can_donate: cand,
          gender: gender,
          blood_type: blood
        });
        res.redirect("/");
      }
    });
  });
module.exports = router;

const express = require('express');

const session = require('express-session');

const firebase = require('firebase/app');
// const firestore = firebase.firestore();

async function get_info(callbck) {
    const ref = firestore.collection('users').doc(session.uid);
    var doc =  await ref.get();
    if (!doc.exists) {
        console.log('User information is not available!');
    } else {
        callbck(doc.data());   
    }
}

module.exports.get_info = get_info;
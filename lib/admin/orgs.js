const firebase = require('firebase/app');
// const firestore = firebase.firestore();

//GET ORGS& HOTSPOTS------------
 function get_orgs(callbck){
    firestore.collection('users').where('user_type', '==', 'org').get().then((snapshot)=>{
        callbck(snapshot);
    });
}
async function get_htspt(callbck){
    const htspt = await firestore.collection('donation_hotspot').get();
    callbck(htspt);
}

//ADD, DELETE & EDIT ORGANISATIONS-------------
async function add_org(email,password,name,org_num,callbck){
    var uid;
    await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            uid = userCredential.user.uid;
        })
    .catch((error) => {
        callbck(error.message);
    });
    if(uid){
        await firestore.collection('users').doc(uid).set({
            name:name,
            org_number:org_num,
            user_type:"org"
        });
        callbck("Organisation added successfully");
    }
}
function del_org(uid){
    firestore.collection("users").doc(uid).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    }); 
}

function edit_org(){
    
}

module.exports.get_orgs = get_orgs;
module.exports.add_org = add_org;
module.exports.get_htspt = get_htspt;
module.exports.del_org = del_org; 
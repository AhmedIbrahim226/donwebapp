const express = require("express");
const router = express.Router();
const session = require("express-session");

const lib_admin = require("../lib/admin/admin.js");
var info = require("../lib/admin/info.js");
var orgs = require("../lib/admin/orgs.js");


router.get('/',(req,res)=>{
    res.render('admin_login');
});

router.post('/',(req,res)=>{
  var account = {
    mail:req.body.email,pass:req.body.password
  };
  var user_info = {name:"",user_type:""};
  var all_orgs = [];
  var orgs_uids = [];
  var hotspots = [];

  lib_admin.admin_login(account.mail,account.pass,(ret)=>{
    if(ret.success == 1){
      orgs.get_orgs((snapshot)=>{
        snapshot.forEach(doc => {
          orgs_uids.push(doc.id);
          all_orgs.push(doc.data());
        });
      });
      
      info.get_info((clbck)=>{
        user_info.name = clbck.name;
        user_info.user_type = clbck.user_type;
        res.render('admin',{uid:ret.uid,
          name:user_info.name,
          user_type:user_info.user_type,
          orgs:all_orgs,
          uids:orgs_uids
        });
      });      
      }else{
        res.render('admin_login',{error:ret.error});
      }
  });
});

router.post('/add_org',(req,res)=>{
  var email = req.body.email;
  var  password = req.body.password;
  var org_name = req.body.org_name;
  var  org_number = req.body.org_number;

  var resp;
  orgs.add_org(email,password,org_name,org_number,(ress)=>{
    resp = ress;
    res.send(resp);
  });
});
router.post('/del_org',(req,res)=>{
  orgs.del_org(req.body.uid);
  res.end();
  
});

router.get('/logout',(req,res)=>{ 
    admin_logout();
    res.end();
});

module.exports = router;

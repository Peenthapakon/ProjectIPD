var express = require('express');
var router = express.Router();
var db = require("./db.js")
router.get('/main', function(req, res, next) {
  var sql = "SELECT * FROM patient "
  var sql2 = "SELECT * from nurse JOIN trolley where nurse_id = 'N002'"
  db.all(sql,(err,result)=>{
    if (err) {
      throw err;
    }
    db.all(sql2,(err,rs)=>{
      if (err) {
        throw err;
      }
      res.render('./Nurse/main',{patients:result,nurse:rs})
     //res.send({patients:result,nurse:rs})
    })
   
  })

 
  

  });
  router.post('/main',(req, res, next)=>{
    let id = req.body.id;
  var sql = "SELECT * FROM patient "
  var sql2 = "SELECT * from nurse JOIN trolley where nurse_id = 'N002'"
    console.log(id);

    if(id === ''){
      req.flash('error','Book successfully');
      res.redirect('/nurse/main')
    }else{
      db.all(sql,(err,result)=>{
        if (err) {
          throw err;
        }
        db.all(sql2,(err,rs)=>{
          if (err) {
            throw err;
          }
          req.flash('success','Book successfully');
          res.render('./Nurse/main',{patients:result,nurse:rs})
         //res.send({patients:result,nurse:rs})
        })
       
      })
    }
  


 

  });
  router.get('/patient', function(req, res, next) {
  
  
    if (req.session.loggedin) {
     res.render('./Nurse/patient');
    } else {
      res.send('กรุณา LOGIN ');
    }
    res.end();
     
    
    
  
  });
  router.get('/returndrug', function(req, res, next) {
  
  
    if (req.session.loggedin) {
      res.render('./Nurse/returndrug');
    } else {
      res.send('กรุณา LOGIN ');
    }
    res.end();
     
 
    
  
  });
  router.get('/skip', function(req, res, next) {
  
    if (req.session.loggedin) {
      res.render('./Nurse/skip');
    } else {
      res.send('กรุณา LOGIN ');
    }
    res.end();

  });



  module.exports = router;
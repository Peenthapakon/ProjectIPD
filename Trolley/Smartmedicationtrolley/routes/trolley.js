var express = require('express');
var router = express.Router();
const { body, validationResult } = require('express-validator');
var db = require("./db.js")
var trolley = require("./dataset.js")
var drug = require("./drug.js");
//const { request } = require('express');
//const e = require('express');
/* GET home page. */

router.get('/main', function(req, res, next) {

  var sql = "SELECT * FROM trolley"
  db.all(sql,(err,result)=>{
    
    if (req.session.loggedin) {
      res.render('./trolley/main',{data:result});
	} else {
    res.redirect('/');
		
	}
	res.end();
  
  });
  // if (req.session.loggedin) {
  //   res.render('./trolley/main',{data:trolley})
	// } else {
	// 	res.send('กรุณา LOGIN ');
	// }
	// res.end();
});

// update รถเข็น
router.get('/add', function(req, res, next) {
  db.all("SELECT * FROM nurse ",(err,rs)=>{
    res.render('./trolley/addtrolley',{nurse:rs})
  })
 
});
// เพิ่ม infomation  รถเข็น
router.post('/add', [
body("code_drug","กรุณาป้อนรหัสยา").not().isEmpty().isLength({max:4}),
body("deparmet","กรุณาเลือกชื่อแผนก").not().isEmpty(),
body("drawer_drug","กรุณากรอกจำนวนลิ้นชัก").not().isEmpty().isLength({max:7}),
body("layer","กรุณากรอกจำนวนชั้น").not().isEmpty().isLength({max:5}),
body("fname","กรุณากรอกชื่อ").not().isEmpty(),
body("lname","กรุณากรอกนามสกุล").not().isEmpty(),
body("position","กรุณากรอกตำแหน่ง").not().isEmpty(),
body("tel","กรุณากรอกเบอร์โทรศัพท์").not().isEmpty()
],function(req, res, next) {
  const result = validationResult(req);
  var errors = result.errors
  if (!result.isEmpty()) {
    db.all("SELECT * FROM nurse ",(err,rs)=>{
      if (req.session.loggedin) {
        res.render('./trolley/addtrolley',{errors:errors,nurse:rs})
    } else {
      res.redirect('/');
      
    }
    res.end();
     
    })
        
    }
 else{
   var data = [req.body.code_drug,req.body.deparmet,req.body.drawer_drug,req.body.layer,req.body.position]
   const sql = "INSERT INTO trolley(id,room_unit,count_drawer,row_number,n_nurse_id) VALUES(?,?,?,?,?)"
   db.run(sql,data,(err)=>{
     if(err){
      return console.log(err.message);
     }
     
    res.redirect('/trolley/main')
   })
 }
 });

// router.post('/add', function(req, res, next) {
//   var drug_id = req.body.drug_id;
//   var drug_name = req.body.drug_name;
//   var drug_matrix = req.body.drug_matrix
//   var drug_row = req.body.drug_row
//   var sql = "INSERT INTO patients values(?,?,?,?)"
//   db.run(sql,[],(err,resule)=>{
    
//   })
//   res.redirect('/trolley/main')
   
//  });

// get รายละเอียดรถเข็น
router.get('/detail/:id', function(req, res, next) {
      var data = req.params.id;
     
      var sql = "SELECT * FROM  trolley t  INNER JOIN nurse n on t.n_nurse_id = n.nurse_id where t.id = ?"
      var sql2 ="SELECT patients_id,first_name,last_name,drawer_number,patient_bed FROM patient p INNER JOIN nurse n on p.nurse_id = n.nurse_id "
      var sql3 ="SELECT m_id,drawer_number from matrix_drawer m CROSS JOIN trolley t on m.fk_trolley_id = t.id" 
      db.all(sql,data,(err,result)=>{
        if (err) {
          res.send(err)
        }else{
          db.all(sql2,(err,patients)=>{
            if (err) {
              res.send(err)
            }
            db.all(sql3,(err,matrix)=>{
              if (req.session.loggedin) {
                res.render('./trolley/detail',{trolley:result,patients:patients,matrix:matrix})
                //res.send({trolley:result,patients:patients,matrix:matrix})
            } else {
              res.redirect('/');
             
            }
            res.end();
            
            })
            
          })
        }
      })
        // trolley.forEach((row,idex)=>{
        //   if (row.c_code == data) {
        //     db.all('select *from Patients',(err,result)=>{
        //       if (err) {
        //         return console.error(err.message);
        //       }
        //       drug.forEach((drugs,index)=>{
        //         res.render('./trolley/detail',{trolley:row,patients:result,drug:drugs})
        //       })
        //     });
        //   }
        // })
      
});

router.post('/detail/:id', function(req, res, next) {
    var data = req.params.id;
     let item = req.body.drug
     console.log(item)
      drug.forEach((result,index)=>{
        if (req.session.loggedin) {
          req.flash('info',result)
          res.redirect('/trolley/detail/'+data)
      } else {
        res.redirect('/');
      }
      res.end();
          req.flash('info',result)
          res.redirect('/trolley/detail/'+data)
    })

});

// delete รถเข็น
router.get('/delete/:id',(req,res) => {
  const id = req.params.id;
  const sql = "DELETE FROM trolley WHERE id = ?";
  db.run(sql,id, err => {
    // if (err) ...
    res.redirect("/trolley/main");
  });


});


// logiut
router.get('/logout',(req,res) => {
  req.session.destroy((err) => {
      if(err) {
          return console.log(err);
      }
      res.redirect('/');
  });

});
module.exports = router;

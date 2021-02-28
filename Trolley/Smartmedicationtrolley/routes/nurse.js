var express = require('express');
const {
  check,
  validationResult
} = require('express-validator');
var router = express.Router();
var db = require("./db.js")

router.get('/main', function (req, res, next) {
  var sql = "SELECT * FROM patient "
  var sql2 = "SELECT * from nurse JOIN trolley where nurse_id = 'N002'"
  db.all(sql, (err, result) => {
    if (err) {
      throw err;
    }
    db.all(sql2, (err, rs) => {
      if (err) {
        throw err;
      }
      res.render('./Nurse/main', {
        patients: result,
        nurse: rs
      })
      //res.send({patients:result,nurse:rs})
    })

  })




});
router.post('/main',

  check('drug', "ป้อนรหัสผู้ป่วยใหม่").not().isEmpty()

  , (req, res, next) => {
    const result = validationResult(req);
    var errors = result.errors;
    if (!result.isEmpty()) {
      var sql = "SELECT * FROM patient "
      var sql2 = "SELECT * from nurse JOIN trolley where nurse_id = 'N002'"
  db.all(sql, (err, result) => {
    if (err) {
      throw err;
    }
    db.all(sql2, (err, rs) => {
      if (err) {
        throw err;
      }
      res.render('./Nurse/main', {
        patients: result,
        nurse: rs,
        errors:errors
      })
      //res.send({patients:result,nurse:rs})
    })

  })
      
    }else{
      res.redirect('/')
    }
  });
router.get('/patient', function (req, res, next) {


  if (req.session.loggedin) {
    res.render('./Nurse/patient');
  } else {
    res.send('กรุณา LOGIN ');
  }
  res.end();




});
router.get('/returndrug', function (req, res, next) {


  if (req.session.loggedin) {
    res.render('./Nurse/returndrug');
  } else {
    res.send('กรุณา LOGIN ');
  }
  res.end();




});
router.get('/skip', function (req, res, next) {

  if (req.session.loggedin) {
    res.render('./Nurse/skip');
  } else {
    res.send('กรุณา LOGIN ');
  }
  res.end();

});



module.exports = router;
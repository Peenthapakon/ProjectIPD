var express = require('express');
var router = express.Router();
var db = require("./db.js")

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('index');
});
router.post('/', function(req, res, next) {
   var username = req.body.userName
   var password = req.body.password

   if (username && password) {
    db.all(`SELECT * FROM account WHERE username = ? AND password = ? `,[username,password],(err,result)=>{
      if (result.length >0) {
        for (let key of result) {
          switch (key.type) {
            case '1':
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('trolley/main');
            break;
            case '2':
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('nurse/main');
            break;
            }        
        }
      }else{
        res.send('login ไม่สำเร็จ')
        
        res.end()
      }
     
    });
  } else{
    res.send('กรุณากรอก username && password')
    res.end()
  }

});
router.post('/test/(:id)',(req,res,next)=>{
  let id = req.body.id;
  console.log(id)
})
module.exports = router;

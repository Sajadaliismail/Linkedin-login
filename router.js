var express = require('express')
var router = express.Router();

const credential = {
  email: 'sajadali@gmail.com',
  password:'qwerty123'
}
//login


router.post('/login',(req,res)=>{
  
  if(req.body.email==credential.email&&req.body.password==credential.password){
    req.session.user = req.body.email;
    res.redirect('/route/dashboard') 
  }
  else if(req.body.email!=credential.email&&req.body.password==credential.password){
    res.render('base',{title:'LinkedIn',Password :'Incorrect Email'})
  }
  else{
    res.render('base',{title:'LinkedIn',Password :'Incorrect Password'})
  }
})

router.get('/dashboard',(req,res)=>{
  res.set('Cache-Control', 'no-store');
  if(req.session.user){
    res.render('dashboard',{title :"LinkedIn"})
  }
  else{
    res.redirect('/');
  }
})

//logout
router.get('/logout',(req,res) =>{
  
  req.session.destroy(function(err){
    if(err){
      console.log(err);
      res.send('Error')
    }
    else{
      res.render('base',{title :"LinkedIn",logout :"Logout Successfull"})
    }
  })
})

module.exports = router;
const express = require('express')
const app = express()
const session = require('express-session')
const path = require('path')
const bodyparser = require('body-parser')
const {v4:uuidv4} = require('uuid')

const router = require('./router');

const port = process.env.PORT || 3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.set('view engine','ejs');

app.use('/static',express.static(path.join(__dirname,'public')))
app.use('/Assets',express.static(path.join(__dirname,'public/Assets')))

app.use(session({
  secret:uuidv4(),
  resave: false,
  saveUninitialized: true
}))

app.use('/route',router)
//home.route
app.get('/',(req,res) =>{
  res.render('base',{title :"LinkedIn"})
})

app.listen(port,()=>{
  console.log(`Server is running in http://localhost:${port}`);
})
var express = require('express')
var app = express()
var session = require('express-session')
var Body = require("body-parser") 

app.use(express.static(__dirname + '/views'));
app.use(Body())

app.set('views', './views')
app.set('view engine', 'ejs')

var data ={
    email:"",
    status:false
}

app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    },
    resave: false,
    saveUninitialized: false
}))


app.get('/', function (req, res) {
    res.render("page")
})

app.get('/admin', function (req, res) {
    
    if(req.session.email){
        
        res.render("admin",{data})
    }
    else{
        
        res.render('login',{data})
    }
    

})

app.get('/logout',(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/')
        }
    })
})

app.post('/admin',(req,res)=>{
    if(req.body.Password != 1234 ){
        res.redirect("/")
    }
    else{
        req.session.email = data.email
        
        data.email = req.body.email
        res.redirect("/admin")
        

    }
    

})

app.listen(8000)
const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/user.js')

// sessions.get('/new', (req, res) => {
//     res.render('sessions/new.ejs', { currentUser: req.session.currentUser })
//     res.json()
// })

//=====Possible Scenarios=====
//username and password match

//username exist but pw doesn't match

//username doesn't exist
sessions.post("/", (req,res)=>{
    User.findOne({username: req.body.username}, (err, foundUser)=>{
        if(err) {
            console.log(err);
            res.send("oops the db had a problem")
        }
        else if (!foundUser){
            res.send('<a href="/">Sorry! No user Found </a>')
        }else{
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
                res.redirect('/posts')
            } else{
                res.send("<a href='/'> password does not match</a>")
            }
        }
    })
})

sessions.delete("/", (req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/posts')
    })
})
module.exports= sessions
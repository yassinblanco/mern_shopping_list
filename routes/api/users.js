const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Item Model
const User = require('../../models/User');

// @route POST api/users
// @desc Post a user
// @access Public

router.post('/', (req, res) => {
   const {name, email, password} = req.body; 
   User.findOne({ email })
       .then(user => {
           if(user) return res.status(400).json({msg: 'User already exist!'});

           const newUser = new User({
                name: name,
                email: email,
                password: password                
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                           .then( user => res.json({
                               user: {
                                   id: user.id,
                                   name: user.name,
                                   email: user.email
                               }
                            }))
                           .catch(err => res.status(400).send(err))  
                })
            })
       })   
});

module.exports = router;
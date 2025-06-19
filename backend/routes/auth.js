// import requirements

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');
const router = express.Router();

// signup
router.post('/signup', async (req, res) =>{
    // declare email and password by getting the values from req body
    const { email, password } = req.body;
    // hash the password
    const hashedPass = await bcrypt.hash(password, 10);
    // insert into database
    const user = await db.execute('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPass]);
    res.send({ message: 'User created successfully' });
    console.log(`User created: ${email}`);
})

// Login
router.post('/login', async (req, res) =>{
    const { email, password } = req.body;
    //search for the email in the db 
    const [[user]] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    // if user is not found, return error or pass is wrong
    if(!user || !(await bcrypt.compare(password, user.password)))
        return res.status(401).send({ message: 'Invalid email or password' });
    // if user is found generate token 
    const token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn:'1h'})
    res.json({token})
})

module.exports = router
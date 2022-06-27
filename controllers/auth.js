const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.signup = (req, res) => {
    console.log(req.body)
    const { name, email, phone, password } = req.body
    if (!email || !password || !name || !phone) {
        res.status(403).json({ ResponseCode: 403, shortDescription: 'failure', msg: 'Enter all fields' })
        // res.sendStatus(403)
    }
    else {
        User.findOne({ email }, (err, user) => {
            //check for server errors
            if(err) {
                return res.status(500).json({ ResponseCode: 500, shortDescription: 'failure', error: "Something went wrong" })
            }
            
            // verify if email already exist
            if(user) {
                return res.status(401).json({ ResponseCode: 401, shortDescription: 'failure', error: "Email Already Taken" })
            }
                //if every thing is fine. then create user
                const newUser = User(req.body);
                newUser.save(function (err, newUser) {
                    if (err) {
                        res.json({ ResponseCode: 403, shortDescription: 'failure', error: `Failed to save - ${err}`})
                    }
                    else {
                        res.json({ ResponseCode: 200, shortDescription: "success", msg: 'Successfully saved'})
                    }
                })
        })
    }
}

exports.login = (req, res) => {
    const { email, password } = req.body
    User.findOne({
        email
    }, function (err, user) {
        // Handle server errors
            if (err) return res.status(500).send({ResponseCode: 500, shortDescription: 'failure', error: "Something went wrong"})
            // Check if user exists
            if (!user) return res.status(403).send({ ResponseCode: 403, shortDescription: 'failure', msg: 'Authentication Failed, User not found'})
            user.comparePassword(password, (err, isMatch) => {
                if (isMatch && !err) {
                    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.SECRET_KEY)
                    res.status(200).json({ 
                        ResponseCode: 200, 
                        shortDescription: 'success', 
                        data: {
                            token: token, 
                            role: user.role, 
                            userId: user._id
                        }
                    })
                }
                else {
                    return res.status(403).send({ResponseCode: 403, shortDescription: 'failure', msg: 'Authentication failed, wrong password'})
                }
            })
    })
}

exports.getUserData = (req, res) => {
    User.findOne({ _id: req.user.userId }).exec()
    .then(user => {
        const { _id, name, email, role, phone } = user
        res.status(200).json({
            _id,
            name,
            email,
            phone,
            role
        })
    })
}

exports.isAuthenticated = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null) return res.sendStatus(401)

    // Verify Token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}
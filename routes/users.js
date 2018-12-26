const auth = require('../middleware/auth');
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/me',auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password')
    res.send({
        status: "success",
        data: user
    });
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send({
        status: "error",
        msg: error.details[0].message
    });

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(400).send({
        status: "error",
        msg: "User already Registered"
    });

    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token)
        .send({
            status: "success",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                token: token,
            }
        });
});

module.exports = router;
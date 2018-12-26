const questions = require('../routes/questions');
const users = require('../routes/users');
const auth = require('../routes/auth');
const express = require('express');
const cors = require('cors');

module.exports = function(app) {
    app.use(cors())
    app.use(express.json());
    app.use('/api/questions', questions);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
}
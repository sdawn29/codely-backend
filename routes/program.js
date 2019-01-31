const express = require('express');
const router = express.Router();
const {compileProg} = require('../modules/compile')

router.post('/', async(req, res) => {
    const data = await compileProg(req.body);
    // const data = req.body;
    res.send({
        status: 'success',
        data
    })
});

module.exports = router;
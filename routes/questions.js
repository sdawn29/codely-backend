const auth = require('../middleware/auth');
const admin = require('../middleware/admin')
const {Question, validate} = require('../models/question');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', auth, async (req, res) => {
    const questions = await Question.find().sort('difficulty').select('title body difficulty');
    res.send({
        status: "success",
        data: {questions}
    });
});

router.get('/:id', [auth], async (req, res) => {
    const question = await Question.findById(req.params.id);

    if(!question) return res.status(404).send('The course with the given ID is not found');

    res.send({
        status: "success",
        data: question
    });
})

router.post('/', [auth, admin], async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send({
        status: "error",
        data: error.details[0].message
    });

    const question = new Question({
        title: req.body.title,
        body: req.body.body,
        testcases: req.body.testcases,
        difficulty: req.body.difficulty
    });
    await question.save();

    res.send({
        status: "success",
        data: question
    });
});

router.put('/:id', [auth, admin], async (req, res) => {

    const question = await Question.findOneAndUpdate(req.params.id, {
        title: req.body.title,
        body: req.body.body,
        testcases: req.body.testcases,
        difficulty: req.body.difficulty
    },
    {new: true});

    res.send({
        status: "success",
        data: question
    });
});

router.delete('/:id',[auth, admin], async (req, res) => {
    const question = await Question.findByIdAndRemove(req.params.id);

    if(!question) return res.status(404).send({
        status: "error",
        msg: "The question with the given ID is not found"
    });

    res.send({
        status: "success",
        data: question
    });
})



module.exports = router;

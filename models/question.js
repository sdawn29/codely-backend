const Joi = require('joi');
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    body: {
        type: String,
        required: true,
        minlength:5,
    },
    inputFormat: {
        type: String,
        required: true,
        minlength:5,
    },
    constraints: {
        type: String,
        required: true,
        minlength:5,
    },
    ouputFormat: {
        type: String,
        required: true,
        minlength:5,
    },
    sampleInput: {
        type: String,
        required: true,
        minlength:5,
    },
    sampleOutput: {
        type: String,
        required: true,
        minlength:5,
    },
    testcases: {
        type: [
            new mongoose.Schema({
                body: {
                    type: String,
                    trim: true
                },
                stdin: {
                    type: String,
                    trim: true
                },
                desc: {
                    type: String
                }
            })
        ],
        required: true
    },
    difficulty: {
        type: Number,
        min: 0,
        max: 3
    }
});

const Question = mongoose.model('Question', questionSchema);

function validateQuestion(question) {
    const schema = {
        title: Joi.string().required(),
        body: Joi.string().required(),
        inputFormat:  Joi.string(),
        constraints: Joi.string(),
        ouputFormat: Joi.string(),
        testcases: Joi.array().items(Joi.object({
            body: Joi.string().required(),
            stdin: Joi.string().required(),
            desc: Joi.string().required()
        })),
        difficulty: Joi.number().max(3)
    }

    return Joi.validate(question, schema);
}

exports.Question = Question;
exports.validate = validateQuestion;
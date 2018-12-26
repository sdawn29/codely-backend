const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect('mongodb://localhost:27017/codely', { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(() => console.log('Error Occured'));
}
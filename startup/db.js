const mongoose = require('mongoose');

module.exports = function() {
    mongoose.connect(<Mongo connection String>, { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(() => console.log('Error Occured'));
}

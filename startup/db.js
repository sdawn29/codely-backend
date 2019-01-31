const mongoose = require('mongoose');

module.exports = function() {
    // mongoose.connect('mongodb://dawn:Mys3r3tpassword@ds143614.mlab.com:43614/codely', { useNewUrlParser: true })
    //     .then(() => console.log('Connected to MongoDB'))
    //     .catch(() => console.log('Error Occured'));

    mongoose.connect('mongodb://localhost:27017/codely', { useNewUrlParser: true })
        .then(() => console.log('Connected to MongoDB'))
        .catch(() => console.log('Error Occured'));
}
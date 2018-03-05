const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const review = new Schema ({
    buserId: { type: String },
    username: { type: String },
    review: { type: String },
    businessname: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reviews', review);
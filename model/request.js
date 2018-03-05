const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const requestSchema = new Schema ({
    businessname: { type: String },
    status: { type: String },
    cuserId: { type: String },
    username: { type: String },
    buserId: { type: String },
    category: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Request', requestSchema);
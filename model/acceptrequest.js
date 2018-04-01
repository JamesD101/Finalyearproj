const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;

const acceptrequestSchema = new Schema ({
    businessname: { type: String },
    cuserId: { type: String },
    status: { type: String },
    username: { type: String },
    buserId: { type: String },
    category: { type: String },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Acceptrequest', acceptrequestSchema);
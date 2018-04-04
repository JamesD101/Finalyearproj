const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const worksSchema = new Schema ({
    buserId: { type: String },
    // businessname: { type: String },
    imgpath: { type: String }
});

module.exports = mongoose.model('Works', worksSchema);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const worksSchema = new Schema ({
    buserId: { type: String },
    // businessname: { type: String },
    filename: { type: String },
    contentType: { type: String },
    // md5: { type: String },
    // encoding: { type: String },
    // originalName: { type: String },
    // mimetype: { type: String },
    size: { type: String },
    uploadDate: { type: Date }

});

module.exports = mongoose.model('Works', worksSchema);
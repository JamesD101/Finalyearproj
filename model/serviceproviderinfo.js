const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt-nodejs');

const serviceProviderSchema = new Schema ({
      aboutme : { type: String, required: true, unique: true },
      profilepic : { type: String }

});

module.exports = mongoose.exports('spinfo', serviceProviderSchema);
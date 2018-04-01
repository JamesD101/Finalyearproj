const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;


const statSchema = new Schema ({
    buserId: { type: String },
    cuserId: { type: String },
    likes : { type: Number, default: 0 },
    dislikes : { type: Number, default: 0 }
});

module.exports = mongoose.model('Stat', statSchema);
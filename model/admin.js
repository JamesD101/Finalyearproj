const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const validPasswordChecker = (password) => {
    if (!password) {
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
}

const passwordLengthChecker = (password) => {
    if(!password){
        return false;
    } else {
        if (password.length < 3 || password.length > 50){
            return false;
        } else {
            return true;
        }
    }
}
const passwordValidate = [
    {
        validator: passwordLengthChecker, message : 'Password must be between 3 and 50 characters'
    },
    {
        validator: validPasswordChecker, message: 'Password is invalid'
    }
]
const adminSchema = new Schema ({
    username: { type: String, required: true},
    password: { type: String, required: true, validate: passwordValidate },
});

adminSchema.pre('save', function (next) {
    if(!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

adminSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Auser', adminSchema);
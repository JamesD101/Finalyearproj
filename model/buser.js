const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const emailLengthChecker = (email) => {
    if(!email){
        return false;
    } else {
        if (email.length < 3 || email.length > 50){
            return false;
        } else {
            return true;
        }
    }
}

const validPasswordChecker = (password) => {
    if (!password){
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
}

const validEmailChecker = (email) => {
    if (!email){
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
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
const emailValidate = [
    {
        validator: emailLengthChecker, message : 'Email must be between 3 and 50 characters'
    },
    {
        validator: validEmailChecker, message: 'Email is invalid'
    }
]
const businessSchema = new Schema ({
    fullname: { type: String, required: true, unique: true} ,
    email: { type: String, required: true, unique: true, validate: emailValidate } ,
    businessname: { type: String, required: true, unique: true } ,
    category: { type: String, required: true } ,
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true},
    password: { type: String, required: true, validate: passwordValidate }
});

businessSchema.pre('save', function (next) {
    if(!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

businessSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Buser', businessSchema);
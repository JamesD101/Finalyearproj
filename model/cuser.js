const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


const emailLengthChecker = function(email) {
    if(!email){
        return false;
    } else {
        if (email.length < 3 || email.length > 50){
            return false;
        } else {
            return true;
        }
    }
};

const validPasswordChecker = function(password) {
    if (!password){
        return false;
    } else {
        const regExp = new RegExp(/^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/);
        return regExp.test(password);
    }
};

const validEmailChecker = function(email) {
    if (!email){
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};


const passwordLengthChecker = function (password) {
    if(!password){
        return false;
    } else {
        if (password.length < 3 || password.length > 50){
            return false;
        } else {
            return true;
        }
    }
};

const usernameLengthChecker = function(username){
    if (!username){
        return false;
    }else{
        if (username.length < 3 || username.length > 30){
            return false;
        }else{
            return true;
        }
    }
};
const usernameValidate = [
    {
        validator: usernameLengthChecker, message: 'Username must be between 5 and 30 characters'
    }
];
const passwordValidate = [
    {
        validator: passwordLengthChecker, message : 'Password must be between 3 and 50 characters'
    },
    {
        validator: validPasswordChecker, message: 'Password is invalid'
    }
];
const emailValidate = [
    {
        validator: emailLengthChecker, message : 'Email must be between 3 and 50 characters'
    },
    {
        validator: validEmailChecker, message: 'Email is invalid'
    }
];
const customerSchema = new Schema ({
    username: { type: String, required: true,  unique: true, validate: usernameValidate } ,
    email: { type: String, required: true,  unique: true, validate: emailValidate } ,
    password: { type: String, required: true, validate: passwordValidate }
});

customerSchema.pre('save', function (next) {
    if(!this.isModified('password'))
        return next();

    bcrypt.hash(this.password, null, null, (err, hash) => {
        if(err) return next(err);
        this.password = hash;
        next();
    });
});

customerSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Cuser', customerSchema);
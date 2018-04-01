const Buser = require('../model/buser');
const Auser = require('../model/admin');
const Cuser = require('../model/cuser');
const Request = require('../model/request');
const Rrequest = require('../model/rrequest');
const Comrequest = require('../model/comrequest');
const Acceptrequest = require('../model/acceptrequest');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = function(router){

    router.post('/register', function (req, res) {
        if (!req.body.username) {
            res.json({success: false, message: 'Username is required'});
        } else {
            if (!req.body.password) {
                res.json({success: false, message: 'Password is required'});
            } else {
                let auser = new Auser({
                    username: req.body.username,
                    password: req.body.password
                });
                auser.save(function (err) {
                    if (err) {
                        if (err.code === 11000) {
                            res.json({
                                success: false,
                                message: 'Username already exists'
                            });
                            } else {
                            if (err.errors) {
                                if (err.errors.username) {
                                    res.json({
                                        success: false,
                                        message: err.errors.username.message
                                    });
                                    } else {
                                    if (err.errors.password) {
                                        res.json({success: false, message: err.errors.password.message});
                                        } else {
                                        res.json({success: false, message: err});
                                    }
                                }
                            } else { res.json({success: false, message: err });
                            }
                        }
                    } else {
                        res.json({success: true, message: 'Account Created'});
                    }
                });
            }}
    });

    router.post('/login', function(req,res){
        if (!req.body.username){
            res.json({ success: false, message: 'No Username was provided'});
        } else {
            if (!req.body.password){
                res.json({ success: false, message: 'No password was provided'});
            } else {
                Auser.findOne({ username: req.body.username}, function (err,auser) {
                    if (err){
                        res.json({ success: false, message: 'An error occurred'});
                    } else {
                        if (!auser){
                            res.json({ success: false, message: 'Admin was not found.'});
                        } else {
                            const validPassword = auser.comparePassword(req.body.password);
                            if (!validPassword){
                                res.json ({ success: false, message: 'Password was invalid' });
                            } else {
                                const token = jwt.sign({ auserId: auser._id}, config.secret, {expiresIn: '24h'});
                                res.json({ success: true, message: 'Success!', token: token, auser: {
                                        username: auser.username
                                    }});
                            }
                        }
                    }
                });
            }
        }
    });


    router.use(function (req, res, next) {
        const token = req.headers['authorization'];
        if (!token){
            res.json({ success: false, message: 'No token provided' });
        } else {
            jwt.verify(token, config.secret, function(err, decoded) {
                if (err) {
                    res.json({ success: false, message: 'token invalid: ' +err });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });

    router.get('/allbuser', function (req, res) {
        Buser.find({}, function (err, busers) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!busers) {
                    res.json({ success: false, message: 'No Service Provider Found' });
                } else {
                    res.json({ success: true, busers: busers });
                }
            }
        });
    });




    router.get('/allcuser', function (req, res) {
        Cuser.find({}, function (err, cusers) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!cusers) {
                    res.json({ success: false, message: 'No Customer Found' });
                } else {
                    res.json({ success: true, cusers: cusers });
                }
            }
        });
    });

    router.get('/allreq', function (req, res) {
        Rrequest.find({}, function (err, requests) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!requests) {
                    res.json({ success: false, message: 'No Request Found' });
                } else {
                    res.json({ success: true, requests: requests });
                }
            }
        });
    });

    router.get('/allaccreq', function (req, res) {
        Acceptrequest.find({}, function (err, accs) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!accs) {
                    res.json({ success: false, message: 'No Confirmed Transaction Found' });
                } else {
                    res.json({ success: true, accs: accs });
                }
            }
        });
    });

    router.get('/search/:businessname', function (req, res) {
        Acceptrequest.find({businessname: req.params.businessname}, function (err, accs) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!accs) {
                    res.json({ success: false, message: 'No Confirmed Transaction Found' });
                } else {
                    res.json({ success: true, accs: accs });
                }
            }
        });
    });


    return router;
};
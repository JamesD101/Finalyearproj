const Cuser = require('../model/cuser');
const Buser = require('../model/buser');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = function(router){

    router.post('/cregister', function (req,res) {
        if (!req.body.username){
            res.json({ success: false, message: 'Username is required'});
        } else {
            if(!req.body.email){
                res.json({ success: false, message: 'Email is required'});
            } else {
                if (!req.body.password){
                    res.json({ success: false, message: 'Password is required'});
                } else {
                    let cuser = new Cuser({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password
                    });
                    cuser.save(function (err){
                        if (err){
                            if(err.code === 11000){
                                res.json({ success: false, message: 'Username or email already exists'});
                            } else {
                                if (err.errors){
                                    if (err.errors.email){
                                        res.json({ success: false, message: err.errors.email.message });
                                    } else {
                                        if (err.errors.username){
                                            res.json({ success: false, message: err.errors.username.message });
                                        } else {
                                            if(err.errors.password){
                                                res.json({ success: false, message: err.errors.password.message });
                                            } else {
                                                res.json({ success: false, message: 'Ooops an error occured. Try again'});
                                            }
                                        }
                                    }
                                } else {
                                    res.json({ success:false, message: 'Could not save user ', err});
                                }
                            }
                        } else{
                            res.json({ success: true, message: 'Account Created!!'});
                        }
                    });
                }
            }
        }
    });

    router.post('/bregister', function (req, res) {
        if (!req.body.fullname) {
            res.json({success: false, message: 'Fullname is required'});
        } else {
            if (!req.body.email) {
                res.json({success: false, message: 'Email is required'});
            } else {
                if (!req.body.businessname) {
                    res.json({success: false, message: 'A Business name must be provided'});
                } else {
                    if (!req.body.category) {
                        res.json({success: false, message: 'A Business category must be provided'});
                    } else {
                        if (!req.body.address) {
                            res.json({success: false, message: 'An address must be provided'});
                        } else {
                            if (!req.body.city) {
                                res.json({success: false, message: 'A city must be provided'});
                            } else {
                                if (!req.body.state) {
                                    res.json({success: false, message: 'A State must be provided'});
                                } else {
                                    if (!req.body.password) {
                                        res.json({success: false, message: 'Password is required'});
                                    } else {
                                        let buser = new Buser({
                                            fullname: req.body.fullname,
                                            email: req.body.email,
                                            businessname: req.body.businessname,
                                            category: req.body.category,
                                            address: req.body.address,
                                            city: req.body.city,
                                            state: req.body.state,
                                            password: req.body.password
                                        });
                                        buser.save(function (err) {
                                            if (err) {
                                                if (err.code === 11000) {
                                                    res.json({success: false, message: 'Fullname or e-mail already exists'});
                                                } else {
                                                    if (err.errors) {
                                                        if (err.errors.email) {
                                                            res.json({
                                                                success: false,
                                                                message: err.errors.email.message
                                                            });
                                                        } else {
                                                            if (err.errors.fullname) {
                                                                res.json({
                                                                    success: false,
                                                                    message: err.errors.username.message
                                                                });
                                                            } else {
                                                                if (err.errors.password) {
                                                                    res.json({
                                                                        success: false,
                                                                        message: err.errors.password.message
                                                                    });
                                                                } else {
                                                                    res.json({ success: false, message: err });
                                                                }
                                                            }
                                                        }
                                                    } else {
                                                        res.json({success: false, message: 'Could not create user', err});
                                                    }
                                                }
                                            } else {
                                                res.json({success: true, message: 'Account Created'});
                                            }
                                        });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    router.post('/clogin', function(req,res){
       if (!req.body.username){
           res.json({ success: false, message: 'No username was provided'});
       } else {
           if (!req.body.password){
               res.json({ success: false, message: 'No password was provided'});
           } else {
               Cuser.findOne({ username: req.body.username}, function (err,cuser) {
                   if (err){
                       res.json({ success: false, message: 'An error occurred'});
                   } else {
                       if (!cuser){
                           res.json({ success: false, message: 'Username was not found.'});
                       } else {
                           const validPassword = cuser.comparePassword(req.body.password);
                           if (!validPassword){
                               res.json ({ success: false, message: 'Password was invalid' });
                           } else {
                               res.json({ success: true, message: 'Success!'});
                           }
                       }
                   }
               });
           }
       }
    });

    router.post('/blogin', function(req,res){
        if (!req.body.businessname){
            res.json({ success: false, message: 'No Business Name was provided'});
        } else {
            if (!req.body.password){
                res.json({ success: false, message: 'No password was provided'});
            } else {
                Buser.findOne({ businessname: req.body.businessname}, function (err,buser) {
                    if (err){
                        res.json({ success: false, message: 'An error occurred'});
                    } else {
                        if (!buser){
                            res.json({ success: false, message: 'Business Name was not found.'});
                        } else {
                            const validPassword = buser.comparePassword(req.body.password);
                            if (!validPassword){
                                res.json ({ success: false, message: 'Password was invalid' });
                            } else {
                                const token = jwt.sign({ buserId: buser._id}, config.secret);
                                res.json({ success: true, message: 'Success!', token: token, buser: {
                                    businessname: buser.businessname,
                                        email: buser.email,
                                        category: buser.category,
                                    address: buser.address,
                                        city: buser.city,
                                    state: buser.state
                                    }});
                            }
                        }
                    }
                });
            }
        }
    });

    router.get('/search/:category/:state', function (req,res) {
        if (!req.params.category) {
            res.json({success: false, message: 'Category is required'});
        } else {
            if (!req.params.state) {
                res.json({success: false, message: 'State field is required'});
            } else {
                Buser.find({ category: req.params.category, state: req.params.state }, function (err, busers) {
                    if(err){
                        res.json({ success: false, message: err });
                    } else {
                        if (!busers) {
                            res.json({success: false, message: 'No category like you selected'});
                        }
                        else {
                            res.json({success: true, busers: busers});
                        }
                    }
                });
                // }
                // }
                //     .sort({ '_id' : -1});
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
                   res.json({ success: false, message: 'Token invalid: ' +err });
               } else {
                   req.decoded = decoded;
                   next();
               }
            });
        }
    });

    router.get('/businessprofile', function (req, res) {
        Buser.findOne({ _id: req.decoded.buserId }).select('businessname email address category city state').exec( function (err, buser) {
            if (err) {
                res.json({ success: false, message: 'Error occurred' });
            } else {
                if (!buser) {
                    res.json({ success: false, message: 'User not found'});
                } else {
                    res.json({ success: true, buser: buser });
                }
            }
        });
    });


    router.get('/searchbusiness/:category', function (req,res) {
       Buser.find({ category: req.params.category}, function (err, busers) {
           if(err){
               res.json({ success: false, message: err });
           } else {
               if (!busers) {
                   res.json({ success: false, message: 'No Service Provider is availabe' });
               } else {
                   res.json({ success: true, busers: busers });
               }
           }
       });
    });
    /*router.get('/checkBusiness/:businessname', function (req,res) {
       if (!req.params.businessname){
           res.json({ success:false, message: 'No username' });
        } else {
           Buser.findOne({ businessname: req.params.businessname }, function (err, buser) {
              if(err){
                  res.json({ success:false, message: err});
              } else {
                  if (buser){
                      res.json({ success: false, message: 'Business Name already exists'});
                  } else {
                      res.json({ success: true, message: 'Business Name is available'});
                  }

              }
           });
       }
    });

    router.get('/checkBEmail/:email', function (req,res) {
       if(!req.params.email){
           res.json({ success: false, message: 'No email'});
       } else {
           Buser.findOne({ email: req.params.email }, function (err, buser) {
               if (err){
                   res.json({ success:false, message: err});
               } else {
                   if (buser) {
                       res.json({ success: false, message: 'Use a different email address'});
                   } else {
                       res.json({ success: true, message: 'Email is free to be used'});
                   }
               }
           });
       }
    });

    router.get('/checkUsername/:username', function (req,res) {
        if(!req.params.username){
            res.json({ success:false, message: 'No username'});
        } else {
            Cuser.findOne({ username: req.params.username }, function (err, cuser) {
                if (err){
                    res.json({ success:false, message: err });
                } else {
                    if (cuser) {
                        res.json({ success:false, message: 'Username already exists'});
                    } else {
                        res.json({ success:true, message: 'Username is free'});
                    }
                }
            });
        }
    });

    router.get('/checkEmail/:email', function (req,res) {
       if (!req.params.email){
           res.json({ success:false, message: 'No email'});
       } else {
           Cuser.findOne({ email: req.params.email }, function (err, cuser) {
               if(err){
                   res.json({ success:false, message: err });
               } else {
                   if(cuser){
                       res.json({ success:false, message: 'Email already exists' });
                   } else {
                       res.json({ success:true, message: 'Email is free' });
                   }
               }

           });
       }
    });*/

    return router;
};
const Buser = require('../model/buser');
const Cuser = require('../model/cuser');
const config = require('../config/database');
const jwt = require('jsonwebtoken');

module.exports = function(router){


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
                                                        res.json({success: false, message: 'Could not create user', err });
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
                                const token = jwt.sign({ buserId: buser._id}, config.secret, {expiresIn: '24h'});
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


    router.put('/addinfo/:id', function (req, res) {
        if (!req.params.id) {
            res.json({ success: false, message: 'No User ID was provided' });
        } else {
            Buser.findOne({ _id: req.params.id}).select('_id fullname').exec((err, buser) => {
                if (err) {
                    res.json({ success: false, message: 'Not a valid User ID' });
                }  else {
                    if (!buser) {
                        res.json({ success: false, message: 'No User was found' });
                    } else {
                        buser.fullname = req.body.fullname;
                        buser.save((err) => {
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                res.json({ success: true, message: 'User info has been updated' });
                            }
                        });
                    }
                }
            });

        }
    });

    router.get('/singleuser/:id', function (req,res) {
        if (!req.params.id){
            res.json({ success:false, message: 'No UserID was provided' });
        } else {
            Buser.findOne({_id: req.params.id}).select('_id businessname email address category city state description').exec( function (err, buser) {
                if (err) {
                    res.json({ success: false, message: 'Not a valid User ID' });
                } else {
                    if (!buser) {
                        res.json({ success: false, message : 'User was not found' });
                    } else {
                        res.json({ success: false, buser: buser });
                    }
                }
            });
        }
    });
    router.get('/businessprofile', function (req, res) {
        Buser.findOne({ _id: req.decoded.buserId }).select('_id fullname password businessname category email address city state description').exec( function (err, buser) {
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


    // router.get('/customerprofile', function (req, res) {
    //     Cuser.findOne({ _id: req.decoded.cuserId }).select('_id username').exec( function (err, cuser) {
    //         if (err) {
    //             res.json({ success: false, message: 'Error occurred' });
    //         } else {
    //             if (!cuser) {
    //                 res.json({ success: false, message: 'User not found'});
    //             } else {
    //                 res.json({ success: true, cuser: cuser });
    //             }
    //         }
    //     });
    // });


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
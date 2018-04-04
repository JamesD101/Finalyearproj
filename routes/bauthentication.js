const Buser = require('../model/buser');
const Cuser = require('../model/cuser');
const Request = require('../model/request');
const Rrequest = require('../model/rrequest');
const Comrequest = require('../model/comrequest');
const Acceptrequest = require('../model/acceptrequest');
const config = require('../config/database');
const jwt = require('jsonwebtoken');
const Reviews = require('../model/reviews');
const Works = require('../model/works');
var multer = require('multer');
// set the directory for the uploads to the uploaded to
var DIR = './cfrontend/src/assets/uploads';
//define the type of upload multer would be doing and pass in its destination, in our case, its a single file with the name photo
var upload = multer({dest: DIR}).single('photo');

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

   /* router.post('/upload/:id', function (req, res, next) {
        Buser.findOne({ _id: req.params.id }).select('_id businessname').exec( function (err, buser) {
            if (err) {
                res.json({ success: false, message: 'An error occurred' });
            } else {
                if (!buser){
                    res.json({ success: false, message: 'No User was found' });
                } else {
                    // var path = '';
                    var namey = '';
                    upload(req, res, function (err) {
                        if (err) {
                            // An error occurred when uploading
                            console.log(err);
                            return res.status(422).send("an Error occured");
                        }
                        // No error occured.
                        // path = req.file.path;
                        namey = req.file.filename;
                        // return res.send("Upload Completed for "+path);
                        let works = new Works({
                            buserId: req.params.id,
                            imgpath: namey
                        });
                        works.save(function (err) {
                            if (err) {
                                res.json({ success: false, message: 'An Error Occurred' });
                            } else {
                                res.json({ success: true, message: 'Picture was uploaded successfully' });
                            }
                        });
                    });
                }
            }
        });
    });*/


    router.get('/getreviews/:id', function (req, res) {
        Reviews.find({ buserId: req.params.id }, function (err, review) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!review) {
                    res.json({ success: false, message: 'No review was found' });
                } else {
                    res.json({ success: true, review: review });
                }
            }
        });
    });

    router.get('/checkrequest/:id', function (req, res) {
        Rrequest.find({ buserId: req.params.id}, function (err, somereq) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!somereq) {
                    res.json({ success: false, message: 'You do not have any requested service provider' });
                } else {
                    res.json({ success: true, somereq: somereq });
                }
            }
        });
    });

    router.get('/confirmedrequest/:id', function (req, res) {
        Comrequest.find({ buserId: req.params.id}, function (err, somereq) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!somereq) {
                    res.json({ success: false, message: 'You do not have any requested service provider' });
                } else {
                    res.json({ success: true, somereq: somereq });
                }
            }
        });
    });

    router.get('/acceptedrequest/:id', function (req, res) {
        Acceptrequest.find({ buserId: req.params.id}, function (err, somereq) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!somereq) {
                    res.json({ success: false, message: 'You do not have any requested service provider' });
                } else {
                    res.json({ success: true, somereq: somereq });
                }
            }
        });
    });

    router.get('/deleterequest/:id', function (req, res) {
        Comrequest.findOne({ _id: req.params.id}, function (err, comrequest) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                let request = new Request({
                    businessname: comrequest.businessname,
                    status: 'Pending',
                    cuserId: comrequest.cuserId,
                    username: comrequest.username,
                    buserId: comrequest.buserId,
                    category: comrequest.category
                });
                request.save(function (err){
                    if (err) {
                        res.json({ success: false, message: 'An error occurred while saving'});
                    } else {
                        res.json({ success: true, message: 'Request Saved'});
                        Comrequest.findOneAndRemove({ _id: req.params.id}, function (err) {
                            if (err) {
                                res.json({ success: false, message: err });
                            }
                        });
                    }
                });
            }
        });
    });
    router.get('/singlereq/:id', function (req,res) {
        Comrequest.findOne({ _id: req.params.id}, function (err, request) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!request) {
                    res.json({ success: false, message: 'No request was found' });
                } else {
                    res.json({ success: true, request: request });
                }
            }
        });
    });

    router.post('/acceptreq/:id', function (req, res) {
        if (!req.params.id) {
            res.json({success: false, message: 'No ID found'});
        } else {
            Comrequest.findOne({_id: req.params.id}, function (err, comrequest) {
                if (err) {
                    res.json({success: false, message: 'Not a valid User ID'});
                } else {
                    if (!comrequest) {
                        res.json({success: false, message: 'No Request was found'});
                    } else {
                        let accrequest = new Acceptrequest({
                            businessname: comrequest.businessname,
                            cuserId: comrequest.cuserId,
                            username: comrequest.username,
                            status: 'Done',
                            buserId: comrequest.buserId,
                            category: comrequest.category
                        });
                        accrequest.save((err) => {
                            if (err) {
                                res.json({success: false, message: err});
                            } else {
                                res.json({success: true, message: 'User info has been updated'});
                                Comrequest.findOneAndRemove({ _id: req.params.id}, function (err) {
                                    if (err) {
                                        res.json({ success: false, message: err });
                                    }
                                });
                            }
                        });
                    }
                }
            });
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

    router.put('/adddesc', function (req, res) {
        if (!req.body.businessname) {
            res.json({success: false, message: 'A Business name must be provided'});
        } else {
            if (!req.body.description) {
                res.json({ success: false, message: 'Description is required' });
            } else {
                Buser.findOne({ businessname: req.body.businessname }).select('businessname').exec(function (err, buser) {
                    if (err) {
                        res.json({success: false, message: 'An error occurred' });
                    } else {
                        if (!buser) {
                            res.json({success: false, message: 'No business was found'});
                        } else {
                            buser.description = req.body.description;
                            buser.save(function (err) {
                                if (err) {
                                    res.json({ success: false, message: err });
                                } else {
                                    res.json({ success: true, message: 'Information has been updated successfully' });
                                }
                            });
                        }
                    }
                });
            }
        }
    });


    // router.put('/addinfo', function (req, res) {
    //     if (!req.body.fullname) {
    //         res.json({success: false, message: 'Fullname is required'});
    //     } else {
    //         if (!req.body.businessname) {
    //                 res.json({success: false, message: 'A Business name must be provided'});
    //             } else {
    //                 if (!req.body.description) {
    //                     res.json({success: false, message: 'Description is required'});
    //                 } else {
    //                     Buser.findOne({ businessname: req.body.businessname }, function (err, buser) {
    //                         if (err) {
    //                             res.json({ success: false, message: 'An error occurred here' });
    //                         } else {
    //                             if (!buser) {
    //                                 res.json({ success: false, message: 'No User was found' });
    //                             } else {
                                    // buser.fullname = req.body.fullname;
                                    // buser.businessname = req.body.businessname;
                                    // buser.description = req.body.description;
                                    // buser.save(function (err) {
                                    //     if (err) {
                                    //         res.json({success: false, message: 'An error occurred'});
                                    //     } else {
                                    //         res.json({ success: true, message: 'Information has been updated successfully' });
                                    //        }
                                    //    });
                                   // }
                               // }
                            // });
                        // }
                // }
        // }
// });

    router.get('/singleuser/:id', function (req,res) {
        if (!req.params.id){
            res.json({ success:false, message: 'No UserID was provided' });
        } else {
            Buser.findOne({_id: req.params.id}).select('_id businessname email address category city state description').exec(function (err, buser) {
                if (err) {
                    res.json({success: false, message: 'Not a valid User ID'});
                } else {
                    Works.findOne({buserId: req.params.id}, function (err, avatar) {
                        if (err) {
                            res.json({success: false, message: 'An error occurred'});
                        } else {
                            if (!avatar) {
                                res.json({success: true, buser: buser});
                            } else {
                                res.json({success: true, buser: buser, avatar: avatar});
                            }
                        }
                    });
                }
            });
        }
    });

    router.get('/businessprofile', function (req, res) {
        Buser.findOne({ _id: req.decoded.buserId }).select('_id fullname businessname category email address city state description views').exec( function (err, buser) {
            if (err) {
                res.json({ success: false, message: 'Error occurred' });
            } else {
                if (!buser) {
                    res.json({ success: false, message: 'User not found'});
                } else {
                    Works.findOne({ buserId: req.decoded.buserId}, function (err, avatar) {
                       if (err) {
                           res.json({ success: false, message: 'An error occurred' });
                       } else {
                           if (!avatar) {
                               res.json({success: true, buser: buser});
                           } else {
                               res.json({success: true, buser: buser, avatar: avatar});
                           }
                       }
                    });
                }
            }
        });
    });

    router.get('/getjobrequest', function (req, res) {
       Request.findOne({ buserId: req.params.id }, function(err, request) {
           if (err) {
               res.json({ success: false, message: 'Error occurred' });
           } else {
               if (!request) {
                   res.json({ success: false, message: 'No request was found' });
               } else {
                   res.json({ success: true, request: request });
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
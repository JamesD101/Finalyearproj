const Cuser = require('../model/cuser');
const Buser = require('../model/buser');
const config = require('../config/database');
// const passport = require('passport');
const jwt = require('jsonwebtoken');
const Request = require('../model/request');
const Rrequest = require('../model/rrequest');
const Accrequest = require('../model/acceptrequest');
const Works = require('../model/works');
const Comrequest = require('../model/comrequest');
const Reviews = require('../model/reviews');
const Stat = require('../model/stat');

module.exports = function (router) {

    // register as a customer
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

    // adding request of the customer for a service provider
    router.post('/request', function(req,res){
        if (!req.body.businessname){
            res.json({ success: false, message: 'No businessname was provided'});
        } else {
            if (!req.body.username) {
                res.json({success: false, message: 'No username was provided'});
            } else {
                if (!req.body.status) {
                    res.json({ success: false, message: 'No status was provided' });
                } else {
                    Buser.findOne({businessname: req.body.businessname}, function (err, buser) {
                        if (err) {
                            res.json({success: false, message: 'An error occurred'});
                        } else {
                            if (!buser) {
                                res.json({success: false, message: 'Username was not found.'});
                            } else {
                                Cuser.findOne({username: req.body.username}, function (err, cuser) {
                                    if (err) {
                                        res.json({success: false, message: err});
                                    } else {
                                        if (!cuser) {
                                            res.json({success: false, message: 'No Cuser found'});
                                        } else {
                                            let request = new Request({
                                                businessname: buser.businessname,
                                                status: req.body.status,
                                                cuserId: cuser._id,
                                                username: cuser.username,
                                                buserId: buser._id,
                                                category: buser.category
                                            });
                                            request.save(function (err){
                                                if (err) {
                                                    res.json({ success: false, message: 'An error occurred while saving'});
                                                } else {
                                                    res.json({ success: true, message: 'Request Saved'});
                                                }
                                            });
                                            // res.json({success: true, buser: buser, cuser: cuser});
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    });

    // getting another collection for the same request
    router.post('/rrequest', function(req,res){
        if (!req.body.businessname){
            res.json({ success: false, message: 'No businessname was provided'});
        } else {
            if (!req.body.username) {
                res.json({success: false, message: 'No username was provided'});
            } else {
                if (!req.body.status) {
                    res.json({ success: false, message: 'No status was provided' });
                } else {
                    Buser.findOne({businessname: req.body.businessname}, function (err, buser) {
                        if (err) {
                            res.json({success: false, message: 'An error occurred'});
                        } else {
                            if (!buser) {
                                res.json({success: false, message: 'Username was not found.'});
                            } else {
                                Cuser.findOne({username: req.body.username}, function (err, cuser) {
                                    if (err) {
                                        res.json({success: false, message: err});
                                    } else {
                                        if (!cuser) {
                                            res.json({success: false, message: 'No Cuser found'});
                                        } else {
                                            let rrequest = new Rrequest({
                                                businessname: buser.businessname,
                                                status: req.body.status,
                                                cuserId: cuser._id,
                                                username: cuser.username,
                                                buserId: buser._id,
                                                category: buser.category
                                            });
                                            rrequest.save(function (err){
                                                if (err) {
                                                    res.json({ success: false, message: 'An error occurred while saving'});
                                                } else {
                                                    res.json({ success: true, message: 'Request Saved'});
                                                }
                                            });
                                            // res.json({success: true, buser: buser, cuser: cuser});
                                        }
                                    }
                                });
                            }
                        }
                    });
                }
            }
        }
    });

    // getting request from a particular service provider
    router.get('/checkrequest/:id', function (req, res) {
        Request.find({ cuserId: req.params.id}, function (err, somereq) {
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

    // getting confirmed request from a particular service provider
    router.get('/checkconrequest/:id', function (req, res) {
        Comrequest.find({ cuserId: req.params.id}, function (err, somereq) {
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

    // getting the request for a particular service provider
    router.get('/checkbrequest/:id', function (req, res) {
        Rrequest.find({ buserId: req.params.id}, function (err, somereq) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!somereq) {
                    res.json({ success: false, message: 'No value' });
                } else {
                    res.json({ success: true, somereq: somereq });
                }
            }
        });
    });

    // getting the confirmed request which a particular customer has
    router.get('/confirmedrequest/:id', function (req, res) {
        Accrequest.find({ cuserId: req.params.id}, function (err, somereq) {
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

    // getting the confirmed service provider request
    router.get('/confirmedbrequest/:id', function (req, res) {
        Accrequest.find({ buserId: req.params.id}, function (err, somereq) {
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

    // add reviews for a service provider
    router.post('/addreviews', function (req,res) {
       if (!req.body.review) {
           res.json({ success: false, message: 'No review' });
       } else {
           if (!req.body.businessname) {
               res.json({ success: false, message: 'No business name was found' });
           } else {
               if (!req.body.username) {
                   res.json({ success: false, message: 'No Customer name was found' });
               } else {
                   Cuser.findOne({ username: req.body.username }, function (err, cuser) {
                      if (err) {
                          res.json({ success: false, message: err });
                      } else {
                          if (!cuser) {
                              res.json({ success: false, message: 'No user was found' });
                          } else {
                              Buser.findOne({ businessname: req.body.businessname }, function (err, buser) {
                                 if (err) {
                                     res.json({ success: false, message: err });
                                 } else {
                                     if (!buser) {
                                         res.json({ success: false, message: 'No Service Provider found' });
                                     } else {
                                         let reviews = new Reviews({
                                             review: req.body.review,
                                             buserId: buser._id,
                                             username: cuser.username,
                                             businessname: buser.businessname
                                         });
                                         reviews.save(function (err) {
                                            if (err) {
                                                res.json({ success: false, message: err });
                                            } else {
                                                res.json({ success: true, message: 'Review saved' });
                                            }
                                         });
                                     }
                                 }
                              });
                          }
                      }
                   });
               }
           }
       }
    });

    // getting reviews of service provider
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

    // searching for service provider based on category alone
    router.get('/search/:category', function (req,res) {
        Buser.find({ category: req.params.category}, function (err, busers) {
            if(err){
                res.json({ success: false, message: err });
            } else {
                if (!busers) {
                    res.json({ success: false, message: 'No Service Provider is availabe' });
                } else {
                    res.json({ success: true, busers: busers });
                }
            }}).sort({ 'views' : -1});
    });

    // searching for service provider based on category and state
    router.get('/search/:category?/:state?', function (req,res) {
        if (!req.query.category) {
            res.json({success: false, message: 'Category is required'});
        } else {
            if (!req.query.state) {
                res.json({success: false, message: 'State field is required'});
            } else {
                Buser.find({ category: req.query.category, state: req.query.state }, function (err, busers) {
                    if(err){
                        res.json({ success: false, message: 'You must be log in' });
                    } else {
                        if (!busers) {
                            res.json({success: false, message: 'No category like you selected'});
                        }
                        else {
                            res.json({ success: true, busers: busers });
                            }
                    }
                }).sort({ 'views' : -1});
            }
        }
    });

    // logging by customer
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
                                const token = jwt.sign({ cuserId: cuser._id}, config.secret, {expiresIn: '24h'});
                                res.json({ success: true, message: 'Success!', token: token, cuser: {
                                        id: cuser._id,
                                        username: cuser.username,
                                        email: cuser.email
                                    }});

                            }
                        }
                    }
                });
            }
        }
    });

    // getting works of service provider
    router.get('/getworks/:id', function (req, res) {
        Works.find({ buserId: req.params.id }, function (err, work) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!work) {
                    res.json({success: true, message: 'Service Provider has no uploaded works' });
                } else {
                    res.json({ success: true, work: work });
                }
            }
        });
    });

    // deleting the request of service provider
    router.get('/deleterequest/:id', function (req, res) {
       Request.findOneAndRemove({ _id: req.params.id}, function (err) {
           if (err) {
               res.json({ success: false, message: err });
           } else {
               res.json({ success: true, message: 'Request has been deleted' });
           }
       });
    });

    // getting job request of service provider
    router.get('/getjobrequestofsp/:id', function (req, res) {
        Request.find({ buserId: req.params.id }, function(err, request) {
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

    // getting profile of a particular service provider
    router.get('/onlyserviceprovider/:businessname', function (req,res) {
        Buser.findOne({ businessname: req.params.businessname }).select('_id businessname email address category city state description').exec( function (err, buser) {
            if (err) {
                res.json({ success: false, message: 'An error occured'});
            } else {
                if (!buser) {
                    res.json({success: false, message: 'No Service Provider was found'});
                } else {
                    res.json({success: true, buser: buser});
                }
            }
        });
    });

    // searching directly
    router.get('/directservice/Photography', function (req,res) {
                Buser.find({ category: 'Photography' }, function (err, busers) {
                    if(err){
                        res.json({ success: false, message: 'You must be log in' });
                    } else {
                        if (!busers) {
                            res.json({success: false, message: 'No category like you selected'});
                        }
                        else {
                            res.json({ success: true, busers: busers });
                        }
                    }
                }).sort({ 'views' : -1});
    });
    // searching directly
    router.get('/directservice/Stylist', function (req,res) {
        Buser.find({ category: 'Stylist' }, function (err, busers) {
            if(err){
                res.json({ success: false, message: 'You must be log in' });
            } else {
                if (!busers) {
                    res.json({success: false, message: 'No category like you selected'});
                }
                else {
                    res.json({ success: true, busers: busers });
                }
            }
        }).sort({ 'views' : -1});
    });
    // searching directly
    router.get('/directservice/Catering', function (req,res) {
        Buser.find({ category: 'Catering' }, function (err, busers) {
            if(err){
                res.json({ success: false, message: 'You must be log in' });
            } else {
                if (!busers) {
                    res.json({success: false, message: 'No category like you selected'});
                }
                else {
                    res.json({success: true, busers: busers});
                }
            }
        }).sort({ 'views' : -1});
    });
    // searching directly
    router.get('/directservice/MC', function (req,res) {
        Buser.find({ category: 'MC' }, function (err, busers) {
            if(err){
                res.json({ success: false, message: 'You must be log in' });
            } else {
                if (!busers) {
                    res.json({success: false, message: 'No category like you selected'});
                }
                else {
                    res.json({ success: true, busers: busers });
                }
            }
        }).sort({ 'views' : -1});
    });
    // searching directly
    router.get('/directservice/Makeupartist', function (req,res) {
        Buser.find({ category: 'Makeup artist' }, function (err, busers) {
            if(err){
                res.json({ success: false, message: 'You must be log in' });
            } else {
                if (!busers) {
                    res.json({success: false, message: 'No category like you selected'});
                }
                else {
                    res.json({ success: true, busers: busers });
                }
            }
        }).sort({ 'views' : -1});
    });
    // searching directly
    router.get('/directservice/Eventcenter', function (req,res) {
        Buser.find({ category: 'Event Center' }, function (err, busers) {
            if(err){
                res.json({ success: false, message: 'You must be log in' });
            } else {
                if (!busers) {
                    res.json({success: false, message: 'No category like you selected'});
                }
                else {
                    res.json({ success: true, busers: busers });
                }
            }
        }).sort({ 'views' : -1});
    });

    // getting service provider with reviews
    router.get('/singleserviceprovider/:id', function (req,res) {
            Buser.findOne({_id: req.params.id}).select('_id businessname email address category city state description views image').exec( function (err, buser) {
                if (err) {
                    res.json({ success: false, message: 'An error occured'});
                } else {
                    if (!buser) {
                        res.json({ success: false, message: 'No Service Provider was found' });
                    } else {
                        Reviews.findOne({ buserId: req.params.id}, function (err, review) {
                           if (err) {
                               res.json({success: false, message: err});
                           } else {
                               res.json({success: true, buser: buser, review: review});
                           }
                        });
                    }
                }
            });
    });

    // getting single request
    router.get('/singlereq/:id', function (req,res) {
        Request.findOne({ _id: req.params.id}, function (err, request) {
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

    /*// adding to views
    router.put('/addtoviews/:id', function (req, res) {
        Buser.findOne({ _id: req.params.id }).select('views').exec(function(err, buser) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!buser) {
                    res.json({ success: false, message: 'No user found' });
                } else {
                    buser.views++;
                    buser.save(function (err) {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Added' });
                        }
                    });
                }
            }
        }) ;
    });*/

    // changing status of request
    router.post('/changestatus/:id', function (req, res) {
        if (!req.params.id) {
            res.json({success: false, message: 'No ID found'});
        } else {
            Request.findOne({_id: req.params.id}, function (err, request) {
                if (err) {
                    res.json({success: false, message: 'Not a valid User ID'});
                } else {
                    if (!request) {
                        res.json({success: false, message: 'No Request was found'});
                    } else {
                        let newrequest = new Comrequest({
                            businessname: request.businessname,
                            status: 'Done',
                            cuserId: request.cuserId,
                            username: request.username,
                            buserId: request.buserId,
                            category: request.category
                        });
                        newrequest.save(function (err) {
                            if (err) {
                                res.json({success: false, message: err});
                            } else {
                                res.json({success: true, message: 'User info has been updated'});
                                Request.findOneAndRemove({ _id: req.params.id}, function (err) {
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

    // getting token for the customer
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

    // adding to view only when logged in
    router.put('/addtoviews/:id', function (req, res) {
        Buser.findOne({ _id: req.params.id }).select('views').exec(function(err, buser) {
            if (err) {
                res.json({ success: false, message: err });
            } else {
                if (!buser) {
                    res.json({ success: false, message: 'No user found' });
                } else {
                    buser.views++;
                    buser.save(function (err) {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            res.json({ success: true, message: 'Added' });
                        }
                    });
                }
            }
        }) ;
    });

    // getting profile of customer
    router.get('/customerprofile', function (req, res) {
        Cuser.findOne({ _id: req.decoded.cuserId }).select('_id username').exec( function (err, cuser) {
            if (err) {
                res.json({ success: false, message: 'Error occurred' });
            } else {
                if (!cuser) {
                    res.json({ success: false, message: 'User not found'});
                } else {
                    res.json({ success: true, cuser: cuser });
                }
            }
        });
    });

    // hiring service provider
    router.get('/getforhire/:id', function (req,res) {
        Buser.findOne({_id: req.params.id}).select('_id businessname email address category city state description views image').exec( function (err, buser) {
            if (err) {
                res.json({ success: false, message: 'An error occured'});
            } else {
                if (!buser) {
                    res.json({ success: false, message: 'No Service Provider was found' });
                } else {
                    Reviews.findOne({ buserId: req.params.id}, function (err, review) {
                        if (err) {
                            res.json({ success: false, message: err });
                        } else {
                            if (!review) {
                                res.json({success: true, buser: buser });
                            } else {
                                res.json({ success: true, buser: buser, review: review })
                            }
                        }
                    });
                }
            }
        });
    });



    return router;
};
// const Cuser = require('../model/cuser');
// const Buser = require('../model/buser');
// const Request = require('../model/request');
//
// module.exports = function (router) {
//     router.post('/saverequest', function (req,res) {
//        if (!req.body.businessname){
//            res.json({ success: false, message: 'No service provider present'});
//        } else {
//            if (!req.body.status) {
//                res.json({ success: false, message: 'No status found'});
//            } else {
//                if (!req.body.cuserId) {
//                    res.json({ success: false, message: 'No CuserId found'});
//                } else {
//                    Cuser.findOne({ cuserId: req.body.cuserId }, function (err, cuser) {
//                       if (!err) {
//                           res.json({ success: false, message: 'Error occurred'});
//                       } else {
//                           if (!cuser) {
//                               res.json({ success: false, message: 'No User found' });
//                           } else {
//                               Buser.findOne({ businessname: req.body.businessname }, function (err, buser) {
//                                  if (err) {
//                                      res.json({ success: false, message: 'Error occurred' });
//                                  } else {
//                                      if (!buser) {
//                                          res.json({ success: false, message: 'No Service Provider found' });
//                                      } else {
//                                          let request = new Request({
//                                             businessname: buser.businessname,
//                                             status: req.body.status,
//                                             cuserId: cuser._id,
//                                             customername: cuser.fullname,
//                                             buserId: buser._id,
//                                              category: buser.category
//                                          });
//                                          request.save(function (err){
//                                             if (err) {
//                                                 res.json({ success: false, message: 'An error occurred while saving'});
//                                             } else {
//                                                 res.json({ success: true, message: 'Request Saved'});
//                                             }
//                                          });
//                                      }
//                                  }
//                               });
//                           }
//                       }
//                    });
//                }
//            }
//
//        }
//     });
//
//     return router;
// };
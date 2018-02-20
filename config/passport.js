// const JwtStrategy = require('passport-jwt').Strategy,
//     ExtractJwt = require('passport-jwt').ExtractJwt;
//
// const Cuser = require('../model/cuser');
// const config = require('../config/database');
//
// module.exports = function(passport) {
//     var opts = {}
//     opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
//     opts.secretOrKey = config.secret;
//     passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
//         Cuser.findOne({id: jwt_payload._id}, function (err, cuser) {
//             if (err) {
//                 return done(err, false);
//             }
//             if (cuser) {
//                 return done(null, cuser);
//             } else {
//                 return done(null, false);
//                 // or you could create a new account
//             }
//         });
//     }));
// };
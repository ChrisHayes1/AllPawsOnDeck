var passport = require("passport");
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var mUser = require('../models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        console.log("running serializeUser");
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log("running DEserializeUser");
        mUser.getUserByID(id, function(err, user){
            done(err, user);
        })
    });

    /***************************
     * Logs in an existing user
     **************************/
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'userEmail',
        passwordField : 'userPassword',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        mUser.validateUser(email, password, function (err, user){
            if (err){
                switch(err.message)
                {
                    case 'Wrong Password':
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                        break;
                    case 'User Not Found':
                        return done(null, false, req.flash('loginMessage', 'No user found.')); 
                        break;
                    default:
                        return done(err);
                }
            } else {
               return done(null, user);
            }
        });
    }));

     // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'userEmail',
        passwordField : 'userPassword',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {
        process.nextTick(function() {
            mUser.attemptNewUser(req, email, password, function (err, mUser){
                console.log('about to return done')
                if (err){
                    if (err.message === 'Account Already Exists'){
                        return done(null, false, req.flash('signupMessage', err.message));
                    }else {
                        console.log("local-signup threw the following " + err);
                        return done(err);
                    }
                } else {
                    return done(null, mUser);
                }
            });
        });

    }));

};



/******************************************************
 * All Paws On Deck
 * CS 506
 * Routes.js handles all routing for the server 
 *****************************************************/

var mUser = require('../models/user');
var Training = require('../models/training');
var Position = require('../models/VolunteerPositions');

// app/routes.js
module.exports = function(app, passport) {

    // **********************************
    // HOME PAGE (with login links)
    // **********************************
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // **********************************
    // LOGIN 
    // **********************************
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form

    
    // app.post('/login', do all our passport stuff here);
    // process the login form
    app.post('/login', 
        passport.authenticate('local-login', 
            {
                successRedirect : '/profile', // redirect to the secure profile section
                failureRedirect : '/login', // redirect back to the signup page if there is an error
                failureFlash : true // allow flash messages
            }
        )
    );

    // **********************************
    // SIGNUP
    // **********************************
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
	// process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // **********************************
    // PROFILE SECTION 
    // **********************************
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        mUser.isCoordinator(req, function(err, isCoord){
            if (err)  console.log("error response was " + err);
            //if coord redirect to coord dashboard
            if (isCoord){
                res.redirect('/coorDash');
            } else {
                Training.GetTrainingList(function(mTraining) {
                    res.render('profile.ejs', {
                        user : req.user, // get the user out of session and pass to template
                        trainings : mTraining,
                        page : "profile"
                    });
                });
            }
                
        });
    });

    app.post('/profile', isLoggedIn, function(req, res) {
        //Add code for successful post
        if (isLoggedIn)
        {
            mUser.editUserProfile(req, res, function(err, mBool){
                //TODO Deal with error instead of just loging
                if (err)  console.log("error response was " + err);
                res.redirect('/profile');
            });
        } else {
            res.redirect('/');
        }
    });

    // **********************************
    // DELETE PROFILE
    // **********************************
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/deleteProfile', isLoggedIn, function(req, res) {
        console.log('route found for deleteProfile');
        res.render('deleteProfile.ejs', {
            user : req.user,
            page : "profile"
        });
    });

    app.post('/deleteProfile', isLoggedIn, function(req, res) {
        console.log('ATTEMPTING POST FOR');
        mUser.deleteUserByID(req, function(err, mBool){
            //TODO Deal with error instead of just loging
            if (err)  console.log("error response was " + err);
            req.logout();
            res.redirect('/');
        });
    });

    // **********************************
    // Coordinator Dashboard
    // **********************************
    //This page needs to be shown only to coordinators
    app.get('/coorDash', isLoggedIn, function(req, res) {
        Training.GetTrainingList(function (mTraining) {
            Position.GetPositionList(function (mPositions) { 
                res.render('coorDash.ejs', {
                    user: req.user, // get the user out of session and pass to template
                    trainings: mTraining,
                    positions: mPositions,
                    page : "dash"
                });
            });
        });
    });

    app.post('/coorDash', function (req, res) {
        //Add code for successful post
        if (isLoggedIn) {
            mUser.editUserProfile(req, res, function (err, mBool) {
                Training.addvp(req, res, function (err, mBool) {
                //TODO Deal with error instead of just loging
                if (err) console.log("error response was " + err);

                res.redirect('/coorDash');

                });
            });
        } else {
            res.redirect('/');
        }
    });

    // **********************************
    // APPLICATION
    // **********************************
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/application', isLoggedIn, function(req, res) {
        res.render('application.ejs', {
            user : req.user, // get the user out of session and pass to template
            page : "application"
        });
    });

    // **********************************
    // Volunteer postions
    // **********************************
    //This page needs to be different for user and cordinator
    app.get('/volunteerpositions', isLoggedIn, function (req, res) {
        Position.GetPositionList(function (mPositions) {
            res.render('volunteerposition.ejs', {
                user : req.user, // get the user out of session and pass to template
                positions: mPositions,
                page : "volunteerpositions"
            });
        });
    });

    app.post('/volunteerpositions', function(req, res) {
        //Add code for successful post
        if (isLoggedIn)
        {
            Position.addvp(req, res, function(err, mBool){
                //TODO Deal with error instead of just loging
                if (err)  console.log("error response was " + err);
                
                res.redirect('/volunteerpositions');

            });
        } else {
            res.redirect('/');
        }
    });

    // **********************************
    // LOGOUT 
    // **********************************
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/calendar', isLoggedIn, function(req, res) {
        res.render('calendar.ejs', {
            user : req.user, // get the user out of session and pass to template
            page : "calendar"
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var bodyParser   = require('body-parser');


/****************************
 * Define user schema and a couple of functions tied to passport
 ***************************/
// define the schema for our user model
var userSchema = mongoose.Schema({

    local            : {
        email           : String,
        password        : String,
        firstname       : String,
        lastname        : String,
        phoneNumber     : String,
        isActive        : Boolean,
        appStatus       : String,
        isOrientationComplete: Boolean,
        //completedTraining : Boolean,
        userType     : String,
    },
    address : {
        address1        : String,
        address2        : String,
        city            : String,
        state           : String,
        zip             : Number,
    },
    dob : {
        year            : Number,
        month           : Number,
        day             : Number,
    },
    completedTrainings           : [String],
    qualifiedPositions           : [String]
});

// methods ======================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

/****************************
 * Exposed buisiness logic
 ***************************/
var User = mongoose.model('User', userSchema);


/**
 * Validates user.  Returns user if valid email and password
 */
exports.validateUser = function(email, password, callback){
    //get user, returns error if user not found
    getUserByEmail(email, function(err, user){
        if (err){
            console.log('error thrown on validateUser = ' + err); 
            return callback(err);
        }

        //User found, validate password
        // if the user is found but the password is wrong
        if (!user.validPassword(password)){
            console.log('Wrong password');
            return callback(new Error('Wrong Password'));
        }
        // all is well, return successful user
        return callback(null, user);
    });
}

/**
 * attempts to create a new user, returns error if user already exists or other issue arrises
 */
exports.attempNewUser = function(req, email, password, callback){
    console.log('about to get user');
    getUserByEmail(email, function(err, user){
        console.log('got user, checking response');
        //if user is found the return flash message as part of callback
        if (err){
            if (err.message  === "User Not Found"){
                console.log('user not found, can creat account with first name - ' + req.body.firstName);
                //User not found, go ahead and create
                AddNewUser(req, email, password, function(err, newUser){
                    if (err) return callback(err);
                    return callback(null, newUser)
                });
            }else { //else just return the error to done
                console.log('error thrown on attempNewUser = ' + err); 
                return callback(err);
            }
        } else {
            //no error so user already exists
            console.log('User Already Existed');
            return callback(new error('That email is already taken.')); // req.flash is the way to set flashdata using connect-flash
        }

        
    });
}



/**
 * Modify profile values (everything but email)
 */
exports.editUserProfile = function(req, res, callback){
    //var currentUser = getUserByEmail(req.user.local.email, function(err, result){
    getUserByEmail(req.user.local.email, function(err, result){
        if(err){
            console.log('error thrown = ' + err);    
            return callback(err);
        }
        
        // set the user's new values
        result.local.firstname = req.body.firstName;
        result.local.lastname = req.body.lastName;
        result.local.phoneNumber = req.body.phoneNumber;
        
        result.address.address1 = req.body.address1;
        result.address.address2 = req.body.address2;
        result.address.city = req.body.city;
        result.address.state = req.body.state;

        result.dob.day = req.body.day;
        result.dob.month = req.body.month;
        result.dob.year = req.body.year;

        // save the user - return true in callback
        result.save(function(err) {
            if (err)
                return callback(err);
            return callback(null, true);
        });
    });
}
exports.getUserByID = function(id, callback){
    
    User.findById(id, function(err, user) {
       return  callback(err, user);
    });
}

/****************************
 * Associated helper functions
 ***************************/

 /**
 * Returns requested user if they exist other returns error
 */
function getUserByEmail(email, callback){
    
    User.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return callback(err);

        // if no user is found, return the message
        if (!user) return callback(new Error('User Not Found'));

        // all is well, return successful user
        return callback(null, user);
    });
}

/**
 * Inserts new user into DB
 */
function AddNewUser(req, email, password, callback){
    
    var newUser = new User();

    // set the user's local credentials
    newUser.local.email    = email;
    console.log('about to generate hash');
    newUser.local.password = newUser.generateHash(password);
    console.log('has generate');
    newUser.local.firstname = req.body.firstName;
    newUser.local.lastname = req.body.lastName;
    newUser.local.completedTraining = false;
    newUser.local.userType = "standard";

    // save the user
    console.log('abuot to save the user');
    newUser.save(function(err) {
        console.log('saved, checking error');
        if (err)
            return callback(err);
        console.log('no error, running callback');
        console.log('just saved save the user with firstName ' + newUser.local.firstName);
        return callback(null, newUser);
    });
}

/****************************
 * export as needed
 ***************************/
exports.userData = mongoose.model('User', userSchema);

// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var bodyParser   = require('body-parser');
var VolPos =  require('../models/VolunteerPositions');

const USER_TYPE_STANDARD = "standard";
const USER_TYPE_COORDINATOR = "coordinator";

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
        isCoordinator   : Boolean
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
 * Exposed interface
 ***************************/

//provide inderect internal access to model
var User = mongoose.model('User', userSchema);

/**
 * Updates app status
 */
exports.updateIsCoordinator = function(req, callback){
    console.log("#_#_#_#_# Updating isCoordinator looking for " + req.body.email)
    console.log("#_#_#_#_# New App Status =  " + req.body.newUserType)
    this.getUserByEmail(req.body.email, function(err, user){
        console.log("#_#_#_#_# runnning updateIsCoordinator with email found for " + user.local.email)
        if(err){
            return callback(err);
        } else {
            if (req.body.newUserType == 'Coordinator')
                user.local.isCoordinator = true;
            else
                user.local.isCoordinator = false;
            // save the user - return true in callback
            user.save(function(err) {
                if (err)
                    return callback(err);

                return callback(null);                
            });
        }
    });
}

/**
 * Updates app status
 */
exports.updateAppStatus = function(req, callback){
    console.log("#_#_#_#_# Updating app status looking for " + req.body.email)
    console.log("#_#_#_#_# New App Status =  " + req.body.newStatus)
    this.getUserByEmail(req.body.email, function(err, user){
        //console.log("#_#_#_#_# runnning updateAppStatus with email found for " + user.local.email)
        if(err){
            return callback(err);
        } else {
            user.local.appStatus = req.body.newStatus;
            // save the user - return true in callback
            user.save(function(err) {
                if (err)
                    return callback(err);

                return callback(null);                
            });
        }
    });
}

/**
 * Removes a training from the users CompletedTraining list
 */
exports.removeTraining = function(training, callback){
    User.find({}, function(err, users) {
        // if there are any errors, return the error before anything else
        if (err){
            console.log("error on user.find : " + err);
            return callback(err);
        }
            
        users.forEach(function(mUser) {
            if (mUser.completedTrainings.includes(training)){
                mUser.completedTrainings.remove(training);
                // save the user
                mUser.save(function(err) {
                    if (err){
                        console.log("mUser.save returned error " + err);
                        return callback(err);
                    } 
                });
            }
        });
        return callback(null, true);
    });
};

/**
 * Removes a position from the users QualifiedPositions list
 */
exports.removePosition = function(position, callback){
    User.find({}, function(err, users) {
        // if there are any errors, return the error before anything else
        if (err){
            console.log("error on user.find : " + err);
            return callback(err);
        }
            
        console.log("users found : " + users.length);

        users.forEach(function(mUser) {
            console.log("users name : " + mUser.local.firstname);
            console.log("users training : " + mUser.qualifiedPositions);
            // var index = mUser.qualifiedPositions.indexOf(training);
            // if (index > -1) {
            if (mUser.qualifiedPositions.includes(position)){
                mUser.qualifiedPositions.remove(position);
                // save the user
                console.log("about to save this user");
                mUser.save(function(err) {
                    if (err){
                        console.log("mUser.save returned error " + err);
                        return callback(err);
                    } 
                    console.log("Just saved users new training");
                });
                console.log("!!!!! I think i just exited user save");
            }
                
        });

        return callback(null, true);
    });
};

/**
 * Validates user.  Returns user if valid email and password
 */
exports.validateUser = function(email, password, callback){
    //get user, returns error if user not found
    console.log('validateUser about to get user - ' + email);
    this.getUserByEmail(email, function(err, user){
        if (err){
            console.log('error thrown on validateUser = ' + err);
            return callback(err);
        }
        console.log('validateUser user returned with name  - ' + user.local.firstName);
        //User found, validate password
        // if the user is found but the password is wrong
        if (!user.validPassword(password)){
            console.log('Wrong password');
            return callback(new Error('Wrong Password'));
        }
        console.log('validateUser about to return a user');
        // all is well, return successful user
        return callback(null, user);
    });
}

/**
 * attempts to create a new user, returns error if user already exists or other issue arrises
 */
exports.attemptNewUser = function(req, email, password, callback){
    console.log('attemptNewUser about to get user - ' + email);
    console.log('attemptNewUser about to get user with first name - ' + req.body.firstName);
    this.getUserByEmail(email, function(err, user){
        console.log('got user, checking response');
        //if user is found the return flash message as part of callback
        if (err){
            if (err.message  === "User Not Found"){
                console.log('user not found, can creat account with first name - ' + req.body.firstName);
                //User not found, go ahead and create
                AddNewUser(req, email, password, function(err, newUser){
                    if (err) return callback(err);
                    return callback(null, newUser);
                });
            }else { //else just return the error to done
                console.log('error thrown on attemptNewUser = ' + err);
                return callback(err);
            }
        } else {
            //no error so user already exists
            console.log('User Already Existed');
            return callback(new Error('Account Already Exists')); 
        }


    });
}



/**
 * Modify profile values (everything but email)
 */
exports.editUserProfile = function(req, res, callback){
    //var currentUser = getUserByEmail(req.user.local.email, function(err, result){
    this.getUserByEmail(req.user.local.email, function(err, result){
        if(err){
            console.log('error thrown = ' + err);
            return callback(err);
        }

        // set the user's new values
        result.local.firstname = req.body.firstName;
        result.local.lastname = req.body.lastName;
        result.local.phoneNumber = req.body.phoneNumber;
        console.log('isCoord return = ' + req.body.isCoordinator);
        if (req.body.isCoordinator){
            console.log('isCoord true');
            result.local.isCoordinator = true;
        }else {
            console.log('isCoord false');
            result.local.isCoordinator = false;
        }


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

/**
 *  Returns an instance of the user matching the ID or error if not found
 */
exports.getUserByID = function(id, callback){

    User.findById(id, function(err, user) {
       return  callback(err, user);
    });
}

/**
 * Returns requested user if they exist other returns error
 */
exports.getUserByEmail = function(email, callback){
    console.log('running getUserByEmail');
    User.findOne({ 'local.email' :  email }, function(err, user) {
        console.log('getUserByEmail checking err');
        // if there are any errors, return the error before anything else
        if (err)
            return callback(err);

        // if no user is found, return the message
        console.log('getUserByEmail if user not found return error');
        if (!user) return callback(new Error('User Not Found'));

        // all is well, return successful user
        console.log('getUserByEmail user found');
        return callback(null, user);
    });
}

/**
 * returns true if user is coordinator false if volunteer
 */
exports.isCoordinator = function(req, callback){
    this.getUserByID(req.user.id, function(err, result){
        if (err){
            console.log('error thrown on isCoordinator = ' + err);
            return callback(err);
        }

        //user returned
        console.log('isCoordinator about to return ' + result.local.isCoordinator)
        return callback(null, result.local.isCoordinator);
    });
}

/**
 * Deletes the user sent in if user exists. 
 * TODO: Test to see what gets returned with invalid ID
 */
exports.deleteUserByID = function(req, callback){
    console.log("About to delete user with id " + req.user.id);
    User.findByIdAndRemove({ _id: req.user.id }, function(err) {
        console.log("Remove created call back ");
        if (!err) { //return true if user is deleted
            console.log("Callback returned true, user was deleted?");
                return callback(true)
        }
        else { //return false if we get an error
            console.log("Callback returned error " + err.message);
            return callback(false)
        }
    });
}

/**
 * Return a list of users
 */
exports.GetUserList = function(callback){

    User.find({}, function(err, users) {
        var userList = [];
    
        users.forEach(function(curr) {
            userList.push(curr);
        });
    
        return callback(userList);
      });


    
}


/**
 * Add trainings and then positions to the user
 */
exports.AddUserTraining = function(req, callback){
    console.log("#_#_#_#_# AddUserTraining looking for " + req.body.email)
    this.getUserByEmail(req.body.email, function(err, result){
        console.log("#_#_#_#_# runnning AddUserTraining for " + result.local.email)
        if(err){
            return callback(err);
        } else {
            for(var key in req.body) {
                if(req.body.hasOwnProperty(key)){
                    console.log("key = " + key);
                    //Add positions
                    if (!result.completedTrainings.includes(key) && key !== "email"){
                        console.log('Adding the training ' + key + ' to the user ' + result.local.email );
                        result.completedTrainings.push(key);
                    } else {
                        console.log('The user ' + req.body.email + ' already contains the training ' + key)
                    }
                } 
            }
            // save the user - return true in callback
            result.save(function(err) {
                if (err)
                    return callback(err);

                SetUserPositions(req.body.email, function(err){
                    if (err)
                        return callback(err);
                    return callback(null);
                });
                
            });
        }
    });
}

/****************************
 * Associated helper functions
 ***************************/

 /**
 * Searches through user trainings and checks to see if they qualify for any positions based on the trainings
 */
function SetUserPositions (email, callback){
    console.log("#%#%#%#%# Running Set User Positions");
    module.exports.getUserByEmail(email, function(err, result){
        console.log("#%#%#%#%# Found User " + result.local.firstname + " " + result.local.lastname);
        VolPos.GetQualifiedPositions(result.completedTrainings, function(err, QualifiedPostions) {
            console.log("#%#%#%#%# Get Qualified Positions returned with length of " + QualifiedPostions.length);
            if (err)
                return callback(err);
            QualifiedPostions.forEach(function (position) {
                console.log("#%#%#%#%# Checking position " + position);
                if (!result.qualifiedPositions.includes(position)) {
                    console.log("#%#%#%#%# Adding Postion " + position);
                    result.qualifiedPositions.push(position);
                }
            });
            result.save(function(err) {
                if (err)
                    return callback(err);
                
                return callback(null);
            });
        });
    });
}


/**
 * Inserts new user into DB
 */
function AddNewUser(req, email, password, callback){

    var newUser = new User();
    
    // set the user's local credentials
    newUser.local.email    = email;
    newUser.local.password = newUser.generateHash(password);
    newUser.local.firstname = req.body.firstName;
    newUser.local.lastname = req.body.lastName;
    newUser.local.completedTraining = false;
    newUser.local.isCoordinator = false;
    newUser.local.appStatus = 'Pending'

    // save the user
    console.log('abuot to save the user');
    newUser.save(function(err) {
        if (err)
            return callback(err);
        return callback(null, newUser);
    });
}



/****************************
 * export model as needed.  
 * TODO: Try to clear out using this export.  All data manipulation should be handled internally
 ***************************/
exports.userData = mongoose.model('User', userSchema);

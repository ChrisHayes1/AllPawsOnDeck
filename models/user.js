// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var bodyParser   = require('body-parser');

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

exports.editUserProfile = function(req, res, callback){
    //var currentUser = getUser(req.user.local.email, function(err, result){
    getUser(req.user.local.email, function(err, result){
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

function createNewUser(req){
    
}

function isUser(req){

}

function getUser(email, callback){
    var mUserDB = mongoose.model('User', userSchema);
    mUserDB.findOne({ 'local.email' :  email }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err)
            return callback(err);

        // if no user is found, return the message
        if (!user) return callback(new Error('User Not Found'));

        // all is well, return successful user
        return callback(null, user);
    });
}


exports.userData = mongoose.model('User', userSchema);

var mongoose = require('mongoose');
var User = require('../models/user');
var Position = require('../models/VolunteerPositions');


var trainingSchema = mongoose.Schema({
    trainingName : String,
    TrainingDescription: String
});

/****************************
 * Exposed buisiness logic
 ***************************/
var Trainings = mongoose.model('Training', trainingSchema);


/**
 * Deletes the training sent in if it exists. 
 */
exports.deleteTrainingByName = function(req, callback){
    console.log("About to delete training with name " + req.body.trainingName);
    //need to remove the training from the user first
    Position.removeTraining(req.body.trainingName, function(err, posResult) {
        if (err) return callback(err);
        if (posResult){
            User.removeTraining(req.body.trainingName, function(err, result) {
                if (err) return callback(err);
                if (result){
                    console.log("deleteTrainingByName removeTraingin returned a result");
                    Trainings.remove({ trainingName: req.body.trainingName }, function(err) {
                        console.log("just removed the training");
                        if (!err) { //return true if user is deleted
                            console.log("Callback returned true, training was deleted");
                                return callback(true)
                        }
                        else { //return false if we get an error
                            console.log("Callback returned error " + err.message);
                            return callback(false)
                        }
                    });
                }
            });
        }
    });
}

exports.GetTrainingList = function(callback){
    console.log('Running GetTrainingList');
    Trainings.find({}, function(err, trainings) {
        var trainingList = [];
    
        trainings.forEach(function(training) {
            trainingList.push(training.trainingName);
        });
    
        return callback(trainingList);
      });
}

exports.GetTrainingListCount = function(callback){
    console.log('Running GetTrainingList');
    Trainings.find({}, function(err, trainings) {
        var count = 0;
    
        trainings.forEach(function(training) {
            count++;
        });
    
        return callback(count);
      });
}

exports.GetTrainingListWithDesc = function(callback){
    console.log('Running GetTrainingListWIthDesc');
    Trainings.find({}, function(err, trainings) {
        var trainingList = [];
        console.log('Running GetTrainingListWIthDesc, trainings found');
        trainings.forEach(function(training) {
            var mList = [training.trainingName, training.TrainingDescription];
            trainingList.push(mList);
        });
    
        return callback(trainingList);
      });
}



var trainingData = mongoose.model('Training', trainingSchema);

exports.addTraining = function (req, res, callback) {
    if(req.body.trainingName.length <=0)
        return callback(new Error('Training is blank'));
    trainingData.findOne({ 'trainingName': req.body.trainingName }, function (err, training) {
        // if there are any errors, return the error
        console.log('findOne started');
        if (err) {
            console.log("err when find training " + err);
            return callback(err);
        }

        // check to see if theres already a training with that name
        if (training) {
            //return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            console.log("trainingName exists");
            return callback(null, false);
        } else {

            // if there is no user with that email
            // create the user
            var newTraining = new trainingData();

            newTraining.trainingName = req.body.trainingName;
            newTraining.TrainingDescription = req.body.TrainingDescription;

            // save the vp
            newTraining.save(function (err) {
                if (err)
                    throw (err);
                return callback(null, newTraining);
            });
        }
    });
} 



//module.exports = mongoose.model('Training', trainingSchema);
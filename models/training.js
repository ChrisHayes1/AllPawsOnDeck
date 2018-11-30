var mongoose = require('mongoose');

var trainingSchema = mongoose.Schema({
    trainingName : String,
    TrainingDescription: String
});

/****************************
 * Exposed buisiness logic
 ***************************/
var Trainings = mongoose.model('Training', trainingSchema);


exports.GetTrainingList = function(callback){
    // var mTraining = [
    //     { name: 'Bloody Mary'},
    //     { name: 'Martini' },
    //     { name: 'Scotch' }
    // ];

    Trainings.find({}, function(err, trainings) {
        var trainingList = [];
    
        trainings.forEach(function(training) {
            trainingList.push(training.trainingName);
        });
    
        return callback(trainingList);
      });


    
}



var trainingData = mongoose.model('Training', trainingSchema);

exports.addvp = function (req, res, callback) {
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
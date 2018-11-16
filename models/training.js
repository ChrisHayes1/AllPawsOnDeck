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



//module.exports = mongoose.model('Training', trainingSchema);
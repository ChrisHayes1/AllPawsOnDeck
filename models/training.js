var mongoose = require('mongoose');

var trainingSchema = mongoose.Schema({

    trainingName : String,
    TrainingDescription: String,
    isCompleted: Boolean,



});


module.exports = mongoose.model('Training', trainingSchema);
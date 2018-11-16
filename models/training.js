var mongoose = require('mongoose');

var trainingSchema = mongoose.Schema({
    trainingName : String,
    TrainingDescription: String
});


module.exports = mongoose.model('Training', trainingSchema);
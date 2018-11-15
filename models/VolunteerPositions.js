var mongoose = require('mongoose');

var vpSchema = mongoose.Schema({


	postionID        : Number,
	postionName     : String,
	roleDescription    : String,
	trainings     : [Number],
    
});

vpSchema.methods.requiredTrainings = function () {
    //return trainingList.
}

module.exports = mongoose.model('VolunteerPosition', vpSchema);
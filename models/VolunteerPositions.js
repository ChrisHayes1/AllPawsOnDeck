var mongoose = require('mongoose');

var vpSchema = mongoose.Schema({


	postionID       : Number,
	postionName     : String,
	roleDescription : String,
    trainings       : [Number],
    isCleared       : Boolean
    
});

vpSchema.methods.requiredTrainings = function () {
    
}

module.exports = mongoose.model('VolunteerPosition', vpSchema);
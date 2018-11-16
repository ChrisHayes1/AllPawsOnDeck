var mongoose = require('mongoose');

var vpSchema = mongoose.Schema({
	postionName     : String,
	roleDescription : String,
    trainings       : [String]
});

vpSchema.methods.requiredTrainings = function () {
    
}

module.exports = mongoose.model('VolunteerPosition', vpSchema);
var mongoose = require('mongoose');

/*function VolunteerPositions(postionID, postionName, roleDescription, trainings){

	this.postionID = postionID;
	this.postionName = postionName;
	this.roleDescription = roleDescription;
	this.trainings = trainings;

	this.requiredTraining = function() {
		
	};

}*/

var vpSchema = mongoose.Schema({


	postionID        : Number,
	postionName     : String,
	roleDescription    : String,
	trainings     : [Number],
    
});

module.exports = mongoose.model('VolunteerPosition', vpSchema);
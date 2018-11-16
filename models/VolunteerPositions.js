var mongoose = require('mongoose');

var vpSchema = mongoose.Schema({
	positionName     : String,
	roleDescription : String,
    trainings       : [String]
});

vpSchema.methods.requiredTrainings = function () {
    
}

exports.vpdata = mongoose.model('VolunteerPosition', vpSchema);
var VPData = mongoose.model('VolunteerPosition', vpSchema);
exports.addvp = function(req, res, callback){
	VPData.findOne({'positionName': req.body.positionName}, function(err, vp) {
		// if there are any errors, return the error
		console.log('findOne started');
		if (err) {
			console.log("err when find vlunteer position " + err);
			return callback(err);
		}

		// check to see if theres already a vp with that name
		if (vp) {
			//return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
			console.log("positionName exists");
			return callback(null, false);
		} else {

			// if there is no user with that email
			// create the user
			var newVP            = new VPData();

			newVP.positionName = req.body.positionName;
			newVP.roleDescription = req.body.roleDescription;

			// save the vp
			newVP.save(function(err) {
				if (err)
					throw(err);
				return callback(null, newVP);
			});
		}
	});
} 
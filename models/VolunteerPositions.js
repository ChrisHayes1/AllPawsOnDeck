var mongoose = require('mongoose');

var vpSchema = mongoose.Schema({
	positionName     : String,
	roleDescription : String,
	trainings       : [String],
	startTime: 		Date,
	endTime:		Date
});

var positions = mongoose.model('VolunteerPosition', vpSchema);


exports.GetPositionList = function (callback) {
    // var mTraining = [
    //     { name: 'Bloody Mary'},
    //     { name: 'Martini' },
    //     { name: 'Scotch' }
    // ];

    positions.find({}, function (err, positions) {
        var positionList = [];

        positions.forEach(function (position) {
            positionList.push(position.positionName);
        });

		return callback(positionList);
	});



}


/**
 * Get a list of trainings necessary for a given position
 */

exports.GetQualifiedPositions = function (trainingList, callback) {
	console.log("#*#*#*#*#*#*#*# running GetQualifiedPositions with training list of length " + trainingList.length);
	//Grab all positions
    positions.find({}, function (err, positions) {
		console.log("#*#*#*#* All positions shoudl have been returned here");
		if (err)
			return callback(err);
			
        var qualifiedPositions = new Array(); //List of positions training qualifies user for
		
		//Loop through all positions to see if user is qualified
        positions.forEach(function (position) {
			console.log("#*#*#*#* looping through positions, on " + position.positionName);
			var isQualified = true;
			//Verify that user has completed all trainings necessary for the current position
			position.trainings.forEach(function (training){
				console.log("#*#*#*#* Position " + position.positionName + " needs " + training);
				if (!trainingList.includes(training)){
					console.log("#*#*#*#* User does not have the training " + training);
					isQualified = false;
				}
			});
			if (isQualified) {
				console.log("#*#*#*#* User is qualified for " + position.positionName);
				qualifiedPositions.push(position.positionName);
			} 
        });

		return callback(null, qualifiedPositions);
	});



}



var VPData = mongoose.model('VolunteerPosition', vpSchema);

exports.addvp = function(req, res, callback){
	VPData.findOne({'positionName': req.body.positionName, 'startTime' : req.body.start_t, 'endTime' : req.body.end_t}, function(err, vp) {
		// if there are any errors, return the error
		console.log('findOne started');
		if (err) {
			console.log("err when find volunteer position " + err);
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
			
			for(var key in req.body) {
				if(req.body.hasOwnProperty(key)){
					console.log("vp key = " + key);
					var pos = key.indexOf("training:")
					if (pos > -1) {
						var addTraining = key.substring(9, key.length)
						console.log("adding = " + addTraining);
						newVP.trainings.push(addTraining);
					}
				  
				} 
			}
			

			var y_m_d   = req.body.date + "T";
			var start_t  = req.body.startTime + ":00Z";
			var end_t  = req.body.endTime + ":00Z";
			newVP.startTime = new Date(y_m_d + start_t);
			newVP.endTime = new Date(y_m_d + end_t);

			// save the vp
			newVP.save(function(err) {
				if (err)
					throw(err);
				return callback(null, newVP);
			});
		}
	});
} 
//exports.vpdata = mongoose.model('VolunteerPosition', vpSchema);



var mongoose = require('mongoose');
var User = require('../models/user');

var vpSchema = mongoose.Schema({
	positionName     : String,
	roleDescription : String,
	trainings       : [String],

	// shifts      : [ {
	// 	startTime: 		Date,
	// 	endTime:		Date,
	// 	isTaken:  Boolean
	// } ]	
});

var positions = mongoose.model('VolunteerPosition', vpSchema);


exports.getPositionNameByID = function(id, callback){
	console.log('Attempting to find pName for id ' + id );
	positions.findOne({'_id':id}, function(err, position) {
		if (err) return callback(err);
		if (position){
			console.log('about to return name ' + position.positionName);
			return  callback(err, position.positionName);
		} else {
			return callback('');
		}
	 });
}
/**
 * Deletes the training sent in if it exists. 
 */
exports.deletePositionByName = function(req, callback){
    console.log("About to delete position with name " + req.body.positionName);
	User.removePosition(req.body.positionName, function(err, result) {
        if (err) return callback(err);
        if (result){	
			positions.remove({ positionName: req.body.positionName }, function(err) {
				console.log("Remove created call back ");
				if (!err) { //return true if user is deleted
					console.log("Callback returned true, position was deleted");
						return callback(true)
				}
				else { //return false if we get an error
					console.log("Callback returned error " + err.message);
					return callback(false)
				}
			});
		}
	});
}

/**
 * Removes a training from the positions trainings list
 */
exports.removeTraining = function(training, callback){
    positions.find({}, function(err, position) {
        // if there are any errors, return the error before anything else
        if (err){
            console.log("error on positions.find : " + err);
            return callback(err);
        }
            
        position.forEach(function(mPosition) {
            if (mPosition.trainings.includes(training)){
                mPosition.trainings.remove(training);
                // save the user
                mPosition.save(function(err) {
                    if (err){
                        console.log("mPosition.save returned error " + err);
                        return callback(err);
                    } 
                });
            }
        });
        return callback(null, true);
    });
};

exports.GetPositionList = function (callback) {
    positions.find({}, function (err, positions) {
        var positionList = [];

        positions.forEach(function (position) {
            positionList.push(position.positionName);
        });

		return callback(positionList);
	});
}

exports.GetPositionListDetailed = function (callback) {
    positions.find({}, function (err, positions) {
        var positionList = [];

        positions.forEach(function (position) {
			var mList = [position.positionName, position.roleDescription, position.trainings, position._id];
			positionList.push(mList);
            //positionList.push(position.positionName);
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
	// if(req.body.positionName.length <=0)
    //     return callback(new Error('Position is blank'));
	// VPData.findOne({'positionName': req.body.positionName, 'startTime' : req.body.start_t, 'endTime' : req.body.end_t}, function(err, vp) {
	if (req.body.positionName.length == 0) {
		return callback(null, false, req.flash('vpMessage', 'Position name can not be empty'));
	}
	VPData.findOne({'positionName': req.body.positionName}, function(err, vp) {
		// if there are any errors, return the error
		console.log('findOne started');
		if (err) {
			console.log("err when find volunteer position " + err);
			return callback(err);
		}

		// check to see if theres already a vp with that name
		if (vp) {
			return callback(null, req.flash('vpMessage', 'That position name is already taken.'));
			//console.log("positionName exists");
			//return callback(null, false);
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

			// save the vp
			newVP.save(function(err) {
				if (err)
					throw(err);
				return callback(null, false);
			});
		}
	});
}


//exports.vpdata = mongoose.model('VolunteerPosition', vpSchema);



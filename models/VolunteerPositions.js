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

exports.GetEvents = function (callback) {
	positions.find({}, function (err, positions) {
		var events = []
		positions.forEach(function (position) {
			var event = {
				"id": position._id,
				"title": position.positionName,
				"start": position.startTime,
				"end": position.endTime
			}
			events.push(event);
			//var manager = "Jane Doe";
			//sitePersonel.employees[0].manager = manager;
			//console.log(sitePersonel);

			//console.log(JSON.stringify(sitePersonel));
		});
		console.log(events);
		return callback(events);
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
			newVP.trainings.push(req.body.training);

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



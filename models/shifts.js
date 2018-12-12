var mongoose = require('mongoose');
var VolPos =  require('../models/VolunteerPositions');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ShiftsSchema = mongoose.Schema({
    user_id : String,
    positions_id: String,
    startTime: 		Date,
    endTime:		Date,
});

var ShiftData=mongoose.model('Shifts',ShiftsSchema);

/**
 * Add a new shift
 */
exports.addShift = function(req, callback){
	console.log('About tro add shift with req');
    console.log(req.body);
	var newShift = ShiftData();

	var y_m_d   = req.body.date + "T";
	var start_t  = req.body.startTime + ":00Z";
	var end_t  = req.body.endTime + ":00Z";

	newShift.startTime = new Date(y_m_d + start_t);
	newShift.endTime = new Date(y_m_d + end_t);
	newShift.positions_id = req.body.positionID;

	// save the vp
	newShift.save(function(err) {
		if (err)
			throw(err);
		return callback(null);
	});

};

/**
 * Returns a list of events
 */
exports.GetEvents = function (hasUser, callback) {
	var filter = '';
	if(hasUser == true){
		filter = 'user_id: {$exists:true}}';
	} else if (hasUser == false) {
		filter = 'user_id: {$exists:false}}';
	}
	ShiftData.find({}, function (err, shifts) {
		// if there are any errors, return the error before anything else
        if (err){
            console.log("error on positions.find : " + err);
            return callback(err);
        }
		var events = [];
		console.log('Shifts has a length of ' + shifts.length);

		var eventsRun = 0;
		shifts.forEach(function (shift) {
			VolPos.getPositionNameByID(shift.positions_id, function(err, pName) {
				console.log('Checking position name');
				// if there are any errors, return the error before anything else
				if (err){
					console.log("error on shifts.forEach : " + err);
					return callback(err);
				}
				console.log('About to add id ' + shift._id);
				console.log('About to add position ' + pName);
				var event = {
					"id": shift._id,
					"title": pName,
					"start": shift.startTime,
					"end": shift.endTime,
					"user": shift.user_id
				};
				events.push(event);
				eventsRun++;
				if (eventsRun == shifts.length){
					console.log(events);
					console.log('returning callback for GetEvents');
					return callback(null, events);
				}
			});
		});
	});
};





exports.AddSchedShift=function(req,res,callback){
    console.log(req.body.event);
    console.log(req.user.id);
    ShiftData.findOne({'_id':req.body.event},function(err,fShift){
    // if there are any errors, return the error
		console.log('findOne started');
		if (err) {
			console.log("err when find scheduled shifts " + err);
			return callback(err);
        }
        // check to see if theres already a vp with that name
		if (!fShift) {
			console.log("shift not found");
			return callback(new Error('Shift not found'));
		}
		console.log("userID = " + fShift.user_id);
		if (fShift.user_id === undefined || fShift.user_id === null) {
			//if the user has not signed the selected positions
            //add the record 
            
            fShift.user_id=req.user.id;

            // save the ss
			fShift.save(function(err) {
				if (err)
					throw(err);
				return callback(null);
			});
		} else {
			console.log("the position has already been signed up for");
			return callback(null);
            
        }
    });
}

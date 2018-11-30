var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var scheduledShiftsSchema = mongoose.Schema({
    user_id : ObjectId,
    positions_id: ObjectId
});

var SSData=mongoose.model('scheduledShifts',scheduledShiftsSchema);

exports.addss=function(req,res,callback){
    SSData.findOne({'user_id':req.body.user_id,'pos_id':req.body.positions_id},function(err,vp){
    // if there are any errors, return the error
		console.log('findOne started');
		if (err) {
			console.log("err when find scheduled shifts " + err);
			return callback(err);
        }
        // check to see if theres already a vp with that name
		if (vp) {
			console.log("the position has already signed by the user");
			return callback(null, false);
		} else {
            //if the user has not signed the selected positions
            //add the record 
            var newSS=new SSData();
            newSS.user_id=req.body.user_id;
            newSS.positions_id=req.body.user_id;

            // save the ss
			newSS.save(function(err) {
				if (err)
					throw(err);
				return callback(null, newSS);
			});
        }
    });
}
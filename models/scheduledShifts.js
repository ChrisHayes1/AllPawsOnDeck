var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId;

var scheduledShiftsSchema = mongoose.Schema({
    user_id : ObjectId,
    positions_id: ObjectId
});

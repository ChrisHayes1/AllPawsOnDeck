var mongoose = require('mongoose');

var shiftsSchema = mongoose.Schema({
    shiftStart : Date,
    shiftEnd: Date,
    shiftStatus:Boolean
});

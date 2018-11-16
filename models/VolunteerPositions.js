var mongoose = require('mongoose');

var vpSchema = mongoose.Schema({
	positionName     : String,
	roleDescription : String,
    trainings       : [String]
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

//module.exports = mongoose.model('VolunteerPosition', vpSchema);
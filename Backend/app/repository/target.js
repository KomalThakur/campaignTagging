const { TargetSchema } = require('../schemas');

function getSpecificTargets(dataArray) {
    return TargetSchema.find({
        'key': { $in: dataArray}
    });

};

module.exports = {
    getSpecificTargets
}

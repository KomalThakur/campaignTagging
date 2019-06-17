var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var populationSchema = new Schema({
    channel: String,
    subsegments : [String],
    total: Number

}, {
        collection: 'population'
    });
    populationSchema.index({ subsegments: 1 });
module.exports = mongoose.model('PopulationSchema', populationSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignInfoSchema = new Schema({
    campaignId:  {
        type:String,
        unique: true
    },
    sendCount: String,
    engagement: {
        or : String,
        ctor : String,
        ctr : String
    },
    conversions : {
        targetCategory : String,
        allCategories : String
    }

}, {
        collection: 'campaignInfo'
    });
    campaignInfoSchema.index({campaignId: 1 });
module.exports = mongoose.model('CampaignInfoSchema', campaignInfoSchema);
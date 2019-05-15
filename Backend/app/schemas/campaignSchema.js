var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var campaignSchema = new Schema({
    channel: String,
    name: String,
    description: String,
    campaignType: String,
    campaignCategory: String,
    deploymentDate: Date,
    product: [String],
    alwayOn: Boolean,
    phase: String,
    messageType: String,
    touch: Number,
    numOfCreatives: Number,
    creativeAttributes : [ {
        creativeVersion : String,
        creativeDescription : String,
        keyVisual: String,
        offer : String,
        audienceSegment: [String],
        audienceSubsegment: [String],
        marketingId: String,
        preHeader: String,
        subjectLine: String
    }],
    createTimestamp: Date,
    userId: String,
    userEmail: String,
    campaignId: {
        type:String,
        unique: true
    }

}, {
        collection: 'campaigns'
    });
    campaignSchema.index({ userId: 1, campaignId: 1 });
module.exports = mongoose.model('CampaignSchema', campaignSchema);
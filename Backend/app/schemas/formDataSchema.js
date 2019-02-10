var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var formDataSchema = new Schema({
    campaignCategories : [String],
    campaignTypes : [String],
    products : Object,
    formFieldsEmail: Object,
    formFieldsPn: Object,
    responses : [{
        label : String,
        value : Boolean
    }],
    messageTypes: [String],
    phases : [String],
    audienceSegments: [String],
    keyVisuals: [String]
}, {
        collection: 'form_data'
    });
module.exports = mongoose.model('FormDataSchema', formDataSchema);
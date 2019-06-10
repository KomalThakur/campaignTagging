var mongoose = require( 'mongoose' );

var targetSchema = new mongoose.Schema({
  key: {
    type: String,
    unique: true,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
}, {
    collection: 'target'
});


module.exports = mongoose.model('TargetSchema', targetSchema);
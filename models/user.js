
var mongoose = require('mongoose');
var validEmail = require('../helpers/validate/email');

var schema = mongoose.Schema({
	_id: { type: String, lowercase: true, trim: true, validate: validEmail },
	name: { first: String, last: String },
	salt: { type: String, required: true },
	hash: { type: String, required: true },
	created: { type: Date, default: Date.now }
});

// properties that do not get saved to the db
schema.virtual('fullname').get(function () {
	return this.name.first + ' ' + this.name.last;
})

mongoose.model('User', schema);
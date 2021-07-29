let { Schema, model } = require('mongoose');

let data = new Schema({
	user: { type: String },
	title: { type: String },
	body: { type: String },
});

module.exports = model('tag', data);

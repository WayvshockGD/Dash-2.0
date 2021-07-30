let { Schema, model } = require('mongoose');
let config = require('../../config.json');

let data = new Schema({
	guild: { type: String, default: config.guild },
	user: { type: String },
	title: { type: String },
	body: { type: String },
});

module.exports = model('tag', data);

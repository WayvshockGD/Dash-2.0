const Base = require('../Base');

/* eslint-disable no-unused-vars */
let d = require('detritus-client');
const Tag = require('../../models/Tag');

module.exports = class Taglist extends Base {
	constructor(client) {
		super(client);

		this.name = 'taglist';
	}

	/**
     * @param {d.Command.Context} context 
     */
	async run(context) {
		let data = await Tag.find();
		let tags = [];

		for (let tag of data) {
			tags.push(tag.title);
		}

		let tagData = (tags.length) ? tags : [ 'No tags of length to show' ];

		return await context.channel.createMessage(tagData.join(', '));
	}
};

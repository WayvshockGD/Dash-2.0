const Base = require('../Base');

/* eslint-disable no-unused-vars */
let d = require('detritus-client');
const Tag = require('../../models/Tag');
let config = require("../../../config.json");

module.exports = class Taglist extends Base {
	constructor(client) {
		super(client);

		this.name = 'taglist';
        this.aliases = ["tags"];
	}

	/**
     * @param {d.Command.Context} context 
     */
	async run(context) {
		let tags = [];

        let data = await Tag.find({ guild: config.guild });

		for (let tag of data) {
			tags.push(`\`${tag.title}\``);
		}

		let tagData = (tags.length) ? tags : [ 'No tags of length to show' ];

		return await context.reply(tagData.join(", "));
	}
};

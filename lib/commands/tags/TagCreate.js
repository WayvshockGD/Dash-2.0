const Base = require('../Base');

/* eslint-disable no-unused-vars */
let d = require('detritus-client');
const Tag = require('../../models/Tag');

module.exports = class Embed extends Base {
	constructor(client) {
		super(client);

		this.name = 'tag create';
		this.priority = 1;

		this.label = 'tag_data';
	}

	/**
     * @param {d.Command.Context} context 
     */
	async run(context, arg) {
		let [ name, ...body ] = arg.tag_data.split(' ');

		if (!name) {
			return context.editOrReply('There was no name for the tag.');
		}

		if (!body.length) {
			return context.editOrReply('There were no arguments for the body of the tag.');
		}

		let tag = new Tag({
			user: context.userId,
			title: name,
			body: body.join(' '),
		});

		tag.save();
		context.reply(`Created tag \`${name}\`.`);
	}
};

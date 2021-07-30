const Base = require('../Base');

/* eslint-disable no-unused-vars */
let d = require('detritus-client');
const Tag = require('../../models/Tag');

module.exports = class TagDelete extends Base {
	constructor(client) {
		super(client);

		this.name = 'tag edit';
		this.label = 'tag';
		this.priority = 1;
	}

	/**
     * @param {d.Command.Context} context 
     */
	async run(context, args) {
		let [ name, ...body ] = args.tag.split(' ');

		if (!name) {
			return context.editOrReply('There was no name for the tag.');
		}

		if (!body.length) {
			return context.editOrReply('There were no arguments for the body of the tag.');
		}

		await Tag.findOne({ title: name }, function(err, data) {
			if (!data) {
				return context.reply('No data found for that tag.');
			}

			if (!context.userId.includes(data.user)) {
				return context.reply('You cant edit that tag, since someone else owns it.');
			}

			data.body = body.join(" ");
			
			context.reply(`Edited tag \`${data.title}\``);
			data.save();
		});
	}
};

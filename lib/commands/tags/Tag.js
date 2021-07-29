const Base = require('../Base');

/* eslint-disable no-unused-vars */
let d = require('detritus-client');
const Tag = require('../../models/Tag');

module.exports = class TagCommand extends Base {
	constructor(client) {
		super(client, { name: 'tag' });

		this.label = 'tag_data';
	}

	/**
     * @param {d.Command.Context} context 
     */
	async run(context, args) {
		if (!args.tag_data.length) {
			return await context.reply('No arguments were present to search.');
		}

		let data = await Tag.findOne({ title: args.tag_data.split(' ')[0] });

		if (!data) {
			return await context.reply('No data for that tag found...');
		} else {
			if (context.message.referencedMessage) {
				return await context.reply({
					content: data.body,
					messageReference: {
						messageId: context.message.referencedMessage.id,
					},
					allowedMentions: {
						repliedUser: false,
					},
				});
			}
			return await context.reply(data.body);
		}
	}
};

const Base = require('../Base');

/* eslint-disable no-unused-vars */
let d = require('detritus-client');
const Tag = require('../../models/Tag');

module.exports = class TagDelete extends Base {
	constructor(client) {
		super(client);

		this.name = 'tag delete';
		this.label = 'tag';
		this.priority = 1;
	}

	/**
     * @param {d.Command.Context} context 
     */
	async run(context, args) {
		if (!args.tag) {
			return context.reply("You didn't provide a tag to delete");
		}

		let data = (await Tag.findOne({ title: args.tag })) || { title: '', user: context.userId };

		if (!data) {
			return context.reply('No data found for that tag.');
		}

		if (!context.userId.includes(data.user)) {
			return context.reply('The tag you want to delete, someone else owns.');
		}

		await Tag.deleteOne({ title: args.tag });
		return await context.reply(`Deleted tag \`${args.tag}\`.`);
	}
};

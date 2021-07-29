const Base = require('../Base');

/* eslint-disable no-unused-vars */
let d = require('detritus-client');
let config = require('../../../config.json');

module.exports = class Embed extends Base {
	constructor(client) {
		super(client, {
			args: [ { name: 'ping', type: 'bool', default: false }, { name: 'impo', type: 'bool', default: false } ],
		});

		this.name = 'embed';
		this.label = 'levelinfo';
	}

	/**
     * @param {d.Command.Context} context 
     * @param {Dash.embedArgs} args
     */
	run(context, args) {
		if (!config.ownerIDS.includes(context.message.author.id)) return;

		let level = [];

		let embed = new d.Utils.Embed();

		embed.setColor(args.impo ? 0xffa500 : 0x3eb489);

		let messageArgs = args.levelinfo.split(' ');

		let content = { embed };

		if (!messageArgs[0]) {
			return context.editOrReply('A name for the level must be provided.');
		}

		level.push(`Name: ${messageArgs[0]}`);

		if (messageArgs[1]) {
			level.push(`Length: ${messageArgs[1]}`);
		}

		if (messageArgs[2]) {
			level.push(`Song: ${messageArgs[2]}`);
		}

		if (args.ping) {
			content['content'] = '@here';
		}

		content.embed.setDescription(d.Utils.Markup.codeblock(level.join('\n')));

		context.channel.createMessage({ ...content });
	}
};

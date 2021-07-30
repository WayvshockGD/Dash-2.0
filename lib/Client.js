const { CommandClient, ShardClient } = require('detritus-client');
/* eslint-disable */
let d = require('detritus-client');

let { Logger } = require('tslog');
const config = require('./Config');
let json = require('../config.json');

let shardClient = new ShardClient(json.token, {
	gateway: config.gateway,
	cache: config.cache,
});

shardClient.on("warn", console.log);
shardClient.on("error", console.log);

module.exports = class Client extends CommandClient {
	constructor() {
		super(shardClient, { ...config });

		this.logger = new Logger();

		this.initCommands();

		this.on("commandError", this.logger.trace);
		this.on("commandFail", this.logger.trace);

		this.client.on('interactionCreate', ({ interaction }) => {
			let inter = interaction.data.values[0];

			if (inter === 'simp_role') {
				let simp = json.roles.find(r => r.name === 'simp');

				this.addOrRemove(interaction, simp);
			} else if (inter === 'gd_role') {
				let gd = json.roles.find(r => r.name === 'gd');

				this.addOrRemove(interaction, gd);
			} else if (inter === 'dev_role') {
				let dev = json.roles.find(r => r.name === 'developer');

				this.addOrRemove(interaction, dev);
			} else if (inter === 'rates_role') {
				let rates = json.roles.find(r => r.name === 'rates');

				this.addOrRemove(interaction, rates);
			}
		});
	}

	initCommands() {
		this.addMultipleIn('/lib/commands').catch(e => this.logger.trace(e));
	}

	/**
     * @param {d.Structures.Interaction} interaction 
     * @param {*} role 
     * @returns 
     */
	addOrRemove(interaction, role) {
		if (interaction.member.roles.has(role.id)) {
			interaction.respond({
				type: 4,
				data: {
					content: `Removed role \`${role.name}...\``,
					flags: 1 << 6,
				},
			});

			return interaction.member.removeRole(role.id);
		} else {
			interaction.respond({
				type: 4,
				data: {
					content: `Added role \`${role.name}...\``,
					flags: 1 << 6,
				},
			});

			return interaction.member.addRole(role.id);
		}
	}

	async run() {
		await this.client
			.run()
			.then(() => {
				this.logger.info('Ready on shard client...');
			})
			.catch(err => {
				this.logger.error(err);
			});

		await super
			.run()
			.then(() => {
				this.logger.info('Ready on Dash...');
			})
			.catch(err => {
				this.logger.error(err);
			});
	}
};

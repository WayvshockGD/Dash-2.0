/* eslint-disable no-unused-vars */
let d = require('detritus-client');

const Base = require('../Base');
let config = require('../../../config.json');

module.exports = class Ranks extends Base {
	constructor(client) {
		super(client);

		this.name = 'ranks';
		this.aliases = [ 'rank', 'roles' ];
	}

	/**
     * @param {d.Command.Context} context 
     */
	run(context) {
		context.editOrReply({
			content: 'Pick your role',
			components: [
				{
					type: 1,
					components: [
						{
							type: 3,
							customId: 'role_selects',
							options: [
								{
									label: 'Simp',
									value: 'simp_role',
									description: 'Picks the simp role.',
								},
								{
									label: 'GD',
									value: 'gd_role',
									description: 'Picks the gd role.',
								},
								{
									label: 'Developer',
									value: 'dev_role',
									description: 'Picks the developer role.',
								},
								{
									label: 'Rates',
									value: 'rates_role',
									description: 'Picks the rates role.',
								},
							],
						},
					],
				},
			],
		});
	}

	getRoles() {
		let roles = [];

		for (let role of config.roles) {
			roles.push({ name: role.name, value: role.id });
		}

		return roles;
	}
};

const Base = require('../Base');

/* eslint-disable no-unused-vars */
let d = require('detritus-client');

module.exports = class Embed extends Base {
	constructor(client) {
		super(client);

		this.name = 'tag delete';
		this.priority = 1;
	}

	/**
     * @param {d.Command.Context} context 
     */
	run(context) {}
};

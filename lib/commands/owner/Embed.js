const Base = require("../Base");

/* eslint-disable no-unused-vars */
let d = require("detritus-client");

module.exports = class Embed extends Base {
    constructor(client) {
        super(client, {
            args: [
                { name: "no_ping", type: "bool" }
            ]
        });

        this.name = "embed";
    }

    /**
     * @param {d.Command.Context} context 
     * @param {Dash.embedArgs} args
     */
    run(context, args) {
        let embed = new d.Utils.Embed();

        context.channel.createMessage()
    }
}
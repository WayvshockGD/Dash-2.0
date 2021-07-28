const { CommandClient, ShardClient } = require("detritus-client");
let { Logger } = require("tslog");
const config = require("./Config");
let json = require("../config.json");
const { InteractionCallbackTypes } = require("detritus-client/lib/constants");

let shardClient = new ShardClient(json.token, { 
    gateway: config.gateway, 
    cache: config.cache,
});

module.exports = class Client extends CommandClient {
    constructor() {
        super(shardClient, { ...config });

        this.logger = new Logger();

        this.initCommands();

        this.client.on("interactionCreate", ({ interaction }) => {
            if (interaction.data.customId === "role_cancel") {
                return;
            }

            if (interaction.data.values[0] === "simp_role") {
                let simp = json.roles.find(r => r.name === "simp");

                this.addOrRemove(interaction, simp);
            }
        })
    }

    initCommands() {
        this.addMultipleIn("/lib/commands")
            .catch(e => this.logger.trace(e));
    }

    /**
     * @param {} interaction 
     * @param {*} role 
     * @returns 
     */
    addOrRemove(interaction, role) {

        if (interaction.member.roles.has(role.id)) {
            interaction.respond({
                type: InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Removed role \`${role.name}\`...`
                }
            })

            return interaction.member.removeRole(role.id);
        } else {
            interaction.respond({
                type: InteractionCallbackTypes.CHANNEL_MESSAGE_WITH_SOURCE,
                data: {
                    content: `Added role \`${role.name}\`...`
                }
            })

            return interaction.member.addRole(role.id);
        }
    }

    async run() {

        await this.client.run()
        .then(() => {
            this.logger.info("Ready on shard client...");
        }) 
        .catch(err => {
            this.logger.error(err);
        })

        await super.run()
        .then(() => {
            this.logger.info("Ready on Dash...");
        })
        .catch(err => {
            this.logger.error(err);
        })
    }
}
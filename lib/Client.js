const { CommandClient, ShardClient } = require("detritus-client");
let { Logger } = require("tslog");
const config = require("./Config");
let json = require("../config.json");

let shardClient = new ShardClient(json.token, { 
    gateway: config.gateway, 
    cache: config.cache,
});

module.exports = class Client extends CommandClient {
    constructor() {
        super(shardClient, { ...config });

        this.logger = new Logger();

        this.initCommands();
    }

    initCommands() {
        this.addMultipleIn("/lib/commands")
            .catch(e => this.logger.trace(e));
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
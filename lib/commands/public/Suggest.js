const Base = require("../Base");

module.exports = class Suggest extends Base {
    constructor(client) {
        super(client);

        this.name = "suggest";
    }
}
/* eslint-disable no-unused-vars */
let d = require("detritus-client");
let json = require("../config.json");

/**
 * @type {d.CommandClientOptions} 
 */
let config = {
    imageFormat: "jpeg",
    prefixes: [
        "d!",
        `<@${json.clientID}>`
    ],
    cache: {
        messages: 60 * 60 * 1000
    },
    gateway: {
        compress: true,
        autoReconnect: true,
        presence: {
            activity: {
                name: "the server",
                type: 3
            }
        },
        identifyProperties: {
            $browser: "Discord iOS",
            $device: "Discord iOS"
        }
    }
}

module.exports = config;
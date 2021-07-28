
/* eslint-disable no-unused-vars */
let d = require("detritus-client");

const Base = require("../Base");
let config = require("../../../config.json");

module.exports = class Ranks extends Base {
    constructor(client) {
        super(client);

        this.name = "ranks";
        this.aliases = ["rank"];
    }

    /**
     * @param {d.Command.Context} context 
     */
    run(context) {
        let embed = { fields: [] };
        
        for (let field of this.getRoles()) {
            embed["fields"].push(field);
        }
        
        context.editOrReply({ embed, components: [
            {
                type: 1,
                components: [
                    {
                        type: 3,
                        customId: "role_selects",
                        options: [
                            {
                                label: "simp",
                                value: "simp_role",
                                description: "Picks the simp role."
                            }
                        ]
                    }
                ]
            },
            {
                type: 1,
                components: [
                    {
                        type: 2,
                        style: 4,
                        label: "Cancel",
                        customId: "role_cancel",
                        emoji: {
                            id: "750851541694414898",
                            name: "X_Check"
                        }
                    }
                ]
            }
        ]});
    }

    getRoles() {
        let roles = [];

        for (let role of config.roles) {
            roles.push({ name: role.name, value: role.id });
        }

        return roles;
    }
}
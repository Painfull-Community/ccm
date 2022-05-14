module.exports = {
    execute: async function(message, args, util) {
        let config = util.apis["ccm-ccm"].config["ccm"];
        let cls = util.apis["core-cls"].api;
        if(!util.config.owners.includes(message.author.id)) return message.reply(cls.getString("core", "error.permission"));
        if(!args[0]) return message.channel.send(cls.getString("ccm", "usage"))
        if (args[0] == "get") {
            if(!args[1]) return message.channel.send(cls.getString("ccm", "usage"))
            message.channel.send(config?.[args[1]])
        }
        if (args[0] == "set") {
            if(!args[1] || !args[2]) return message.channel.send(cls.getString("ccm", "usage"))
            config[args[1]] = args[2]
            util.apis["ccm-ccm"].api.save("ccm")
        }
        if (args[0] == "what") {
            message.channel.send(JSON.stringify(config))
        }
    }
} //that should be it.
// woo
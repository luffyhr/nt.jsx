const Discord = require("discord.js")
const client = new Discord.Client(
    { intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_BANS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["MESSAGE", "CHANNEL", "REACTION"] }
)

client.login("OTI5MzQ5MDkzNzAzMTg0Mzg0.YdmByg.DqCfTR0O7NYL1iRjwfrSwQPM2q8")

require('events').EventEmitter.prototype._maxListeners = 100;

client.on("ready", () => {
    console.log("nt.jsx");
})

//Prima di tutto mandare il messaggio del ticket
client.on("messageCreate", message => {
    if (message.content == "!ticket") {
        message.channel.send("🚑 MODULO PARTNER  TWITCH 🚑")
            .then(msg => msg.react("🚑")) //Personalizzare l'emoji della reaction
    }
})
client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return
    if (messageReaction.message.partial) await messageReaction.message.fetch();
    if (messageReaction._emoji.name == "🚑") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == "929364170464440341") { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send("😢 Purtroppo hai gia un ticket aperto! chiedici pure tutto, in quel ticket").catch(() => { })
                return
            }
            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent("872448964639719424") //Settare la categoria
                canale.permissionOverwrites.set([
                    {
                        id: server.id ,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ])
                canale.send("Scrivici il tuo nome di Twitch @here")
            })
        }
    }
})
client.on("messageCreate", message => {
    if (message.content == "!chiudi") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando in questo canale");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                message.channel.delete().catch(() => {});
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando in questo canale")
        }
    }
})

//Prima di tutto mandare il messaggio del ticket
client.on("messageCreate", message => {
    if (message.content == "!ticket") {
        message.channel.send("🚑 Aprire questo ticket per contestazione 🚑")
            .then(msg => msg.react("🚑")) //Personalizzare l'emoji della reaction
    }
})
client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return
    if (messageReaction.message.partial) await messageReaction.message.fetch();
    if (messageReaction._emoji.name == "🚑") { //Personalizzare l'emoji della reaction
        if (messageReaction.message.channel.id == "872431985690284093") { //Settare canale
            messageReaction.users.remove(user);
            var server = messageReaction.message.channel.guild;
            if (server.channels.cache.find(canale => canale.topic == `User ID: ${user.id}`)) {
                user.send("😢 Purtroppo hai gia un ticket aperto! chiedici pure tutto, in quel ticket").catch(() => { })
                return
            }
            server.channels.create(user.username, {
                type: "text"
            }).then(canale => {
                canale.setTopic(`User ID: ${user.id}`);
                canale.setParent("872448964639719424") //Settare la categoria
                canale.permissionOverwrites.set([
                    {
                        id: server.id ,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: user.id,
                        allow: ["VIEW_CHANNEL"]
                    }
                ])
                canale.send("Dicci cosa vuoi contestare @here")
            })
        }
    }
})
client.on("messageCreate", message => {
    if (message.content == "!chiudi") {
        var topic = message.channel.topic;
        if (!topic) {
            message.channel.send("Non puoi utilizzare questo comando in questo canale");
            return
        }
        if (topic.startsWith("User ID:")) {
            var idUtente = topic.slice(9);
            if (message.author.id == idUtente || message.member.permissions.has("MANAGE_CHANNELS")) {
                message.channel.delete().catch(() => {});
            }
        }
        else {
            message.channel.send("Non puoi utilizzare questo comando in questo canale")
        }
    }
})


//---- 1° METODO ----
client.on("message", message => {
    if (message.content == "!comando") {
        var embed = new Discord.MessageEmbed() //Crea il tuo embed o messaggio normale
            .setTitle("Reaction roles")
            .setDescription("Clicca sulle reazioni per ottenere i ruoli")

        message.channel.send(embed)
            .then(msg => {
                //Inserire tutte le reazioni che si vogliono
                msg.react("🤟")
                msg.react("🖐️")
            })
    }
})
//Quando viene cliccata una reazione
client.on("messageReactionAdd", async function (messageReaction, user) {
    if (user.bot) return //Le reaction dei bot verranno escluse

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction.message.id == "idMessaggio") { //Settare id messaggio
        if (messageReaction._emoji.name == "🤟") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("idRuolo1"); //Settare ruolo
        }
        if (messageReaction._emoji.name == "🖐️") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.add("idRuolo2");
        }
    }
})
//Quando viene rimossa una reazione
client.on("messageReactionRemove", async function (messageReaction, user) {
    if (user.bot) return

    if (messageReaction.message.partial) await messageReaction.message.fetch();

    if (messageReaction.message.id == "idMessaggio") {
        if (messageReaction._emoji.name == "🤟") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("idRuolo1");
        }
        if (messageReaction._emoji.name == "🖐️") {
            var utente = messageReaction.message.guild.members.cache.find(x => x.id == user.id);
            utente.roles.remove("idRuolo2");
        }
    }
})

//WELCOME
client.on("guildMemberAdd", member => {
    let channel = member.guild.channels.cache.get("871797484547084399");
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        var embed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setThumbnail(memberavatar)
        .addField('Benvenuto nella C.R.I.', `${member}`,)
        .setFooter(`${member.guild.name}`)
        .setImage("https://media.discordapp.net/attachments/907905606550159410/929427693194313769/CRI-bandi1.gif")
        channel.send({ embeds: [embed] })

}   )

//WELCOME
client.on("guildMemberAdd", member => {
    let channel = member.guild.channels.cache.get("900340413179789342");
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        var embed = new Discord.MessageEmbed()
        .setColor('#020506')
        .setThumbnail(memberavatar)
        .addField('Benvenuto in CHILL COMMUNITY', `${member}`,)
        .setFooter(`${member.guild.name}`)
        .setImage("https://cdn.discordapp.com/attachments/879875351461920778/928731568355303494/a_14cd357c3a994a31b097935756ff823c.gif")
        channel.send({ embeds: [embed] })

}   )

//WELCOME
client.on("guildMemberAdd", member => {
    let channel = member.guild.channels.cache.get("740161466971324499");
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        var embed = new Discord.MessageEmbed()
        .setColor('#020506')
        .setThumbnail(memberavatar)
        .addField('Benvenuto in Xenattv', `${member}`,)
        .setFooter(`${member.guild.name}`)
        .setImage("https://cdn.discordapp.com/attachments/879875351461920778/916936179629322280/a_34bb1de3433a0a6fdbe920cd8c4f5dae.gif")
        channel.send({ embeds: [embed] })

    }   )

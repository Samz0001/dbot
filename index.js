const Discord = require("discord.js")
require("dotenv").config()
const TOKEN = "OTk2NzgyMzA0ODU5MDA5MDc1.GWns_h.dY3_SyP1cxfMkP2PdiDJ9U-1KbjCVfLrT0l05o"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES"
    ]
})

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on("messageCreate",(message) => {
    if(message.content == "hi") {
        message.reply("Hello World!")
    }
})
client.login(process.env.TOKEN)
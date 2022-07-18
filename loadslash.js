// Load environment variables from .env file
require("dotenv").config();

const Discord = require("discord.js");
const generateImage = require("./generateImage");

const client = new Discord.Client({
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
});

let bot = {
  client,
  prefix: "s.",
  owners: ["518006195710328844"],
};

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);
client.loadCommands = (bot, reload) =>
  require("./handlers/commands")(bot, reload);
client.loadEvents(bot, false);
client.loadCommands(bot, false);

const guildId = "997135468774834236";

client.slashcommands = new Discord.Collection();
client.loadslashCommands = (bot, reload) =>
  require("./handlers/slashcommands")(bot, reload);
client.loadslashCommands(bot, false);

client.on("ready", async () => {
  const guild = client.guilds.cache.get(guildId);
  if (!guild) return console.error("Target guild not found");

  await guild.commands.set([...client.slashcommands.values()]);
  console.log(`Successfully loaded in ${client.slashcommands.size}`);
  process.exit(0);
});

module.exports = bot;
// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate",(message) => {
//     if(message.content == "hi") {
//         message.reply("Hello World!")
//     }
// })

// const welcomeChannelid = "997146400171241473"

// client.on("guildMemberAdd",async (member) => {
//     const img = await generateImage(member)
// member.guild.channels.cache.get(welcomeChannelid).send({
//     content: `<@${member.id}> Welcome to the server!`,
//     files: [img]
// })
// })

client.login(process.env.TOKEN);

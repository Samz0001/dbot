// Load environment variables from .env file
require("dotenv").config();

const Discord = require("discord.js");
const generateImage = require("./generateImage");
const slashcommands = require("./handlers/slashcommands");

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
client.slashcommands = new Discord.Collection();
client.buttons = new Discord.Collection();

client.loadEvents = (bot, reload) => require("./handlers/events")(bot, reload);

client.loadCommands = (bot, reload) =>
  require("./handlers/commands")(bot, reload);

client.loadslashCommands = (bot, reload) =>
  require("./handlers/slashcommands")(bot, reload);

client.loadbuttons = (bot, reload) =>
  require("./handlers/buttons")(bot, reload);

// client.on("interactionCreate", (Interaction) => {
//   if (!Interaction.isCommand()) return;
//   if (!Interaction.inGuild())
//     return Interaction.reply("This command can only be used  in a server");
//   const slashcmd = client.slashcommands.get(Interaction.commandName);
//   if (!slashcmd) return Interaction.reply("Invalid slash command");

//   if (slashcmd.perms && !Interaction.member.permissions.has(slashcmd.perm))
//     return Interaction.reply("You do not have permission for this command");

//   slashcmd.run(client, Interaction);
// });

client.loadEvents(bot, false);
client.loadCommands(bot, false);
client.loadslashCommands(bot, false);
client.loadbuttons(bot, false);
module.exports = bot;

// client.on("ready", () => {
//     console.log(`Logged in as ${client.user.tag}`)
// })

// client.on("messageCreate",(message) => {
//     if(message.content == "hi") {
//         message.reply("Hello World!")
//     }
// })

const welcomeChannelid = "997146400171241473";

client.on("guildMemberAdd", async (member) => {
  const img = await generateImage(member);
  member.guild.channels.cache.get(welcomeChannelid).send({
    content: `<@${member.id}> Welcome to the server!`,
    files: [img],
  });
});

client.login(process.env.TOKEN);

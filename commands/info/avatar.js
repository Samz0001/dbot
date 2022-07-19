const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "avatar",
  permissions: [],
  category: "info",
  devOnly: false,
  run: async ({ message }) => {
    const user = message.mentions.users.first() || message.author;
    const exampleEmbed = new MessageEmbed()
      .setTitle(`${user.username}'s avatar`)
      .setDescription(
        `[Link to avatar](${user.avatarURL({ format: `png`, dynamic: true })})`
      )
      .setImage(user.displayAvatarURL({ dynamic: true }))
      .setColor("FF0000");
    message.reply({ embeds: [exampleEmbed] });
  },
};

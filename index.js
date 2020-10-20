const { Client, MessageEmbed } = require('discord.js')
const config = require('./config.json')
const client = new Client()

client.login(config.secret_key)

client.on('ready', () => {
  // console.log(`Logged in as ${client.user.tag}!`)
  const embed = new MessageEmbed()
    .setColor(0xff9900)
    .setURL('https://discord.js.org/')
    .setTitle('1 hour later -> Rise or Fall?')
    .setDescription('10000 dolar -> ?')
    .setImage('https://i.pinimg.com/originals/84/53/d6/8453d6f9e8571ba8f1fddd3fc09ab422.jpg')
    .addFields(
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true }
    )
    .setTimestamp()
    .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png')
  client.channels.cache.get('765490673058185231').send(embed).then(messageReaction => {
    console.log(messageReaction)
    messageReaction.react('⬆️')
    messageReaction.react('⬇️')
  })
})

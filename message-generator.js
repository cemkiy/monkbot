
const { MessageEmbed } = require('discord.js')

const config = require('./config.json')

module.exports.new = function (cc) {
  const embed = new MessageEmbed()
    .setColor(config.coins[cc.slug].color)
    .setURL('https://coinmarketcap.com/currencies/' + cc.slug)
    .setTitle('1 hour later -> Up or Down?')
    .setDescription('Make your choise for ' + cc.slug)
    .setImage('https://s3.coinmarketcap.com/generated/sparklines/web/7d/usd/' + cc.id + '.png')
    .setThumbnail('https://s2.coinmarketcap.com/static/img/coins/64x64/' + cc.id + '.png')
    .addFields(
      { name: 'price($)', value: cc.quote.USD.price.toFixed(4).toString(), inline: true },
      { name: '24h', value: cc.quote.USD.percent_change_24h.toFixed(4).toString(), inline: true },
      { name: '7d', value: cc.quote.USD.percent_change_7d.toFixed(4).toString(), inline: true },
      { name: 'market cap', value: cc.quote.USD.market_cap.toFixed(4).toString(), inline: true },
      { name: 'volume', value: cc.quote.USD.volume_24h.toFixed(4).toString(), inline: true },
      { name: 'circulating supply', value: cc.circulating_supply.toFixed(4).toString(), inline: true }
    )
    .setTimestamp()
    .setFooter('you can vote using the following emojis')
  return embed
}

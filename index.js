const { Client, MessageEmbed } = require('discord.js')
const CoinMarketCap = require('coinmarketcap-api')

const config = require('./config.json')
const discordClient = new Client()
const coinMarketCapClient = new CoinMarketCap(config.coin_market_cap.api_key)

console.log('config', config)

let count = 0

discordClient.login(config.discord.secret_key)

discordClient.on('ready', () => {
  // console.log(`Logged in as ${client.user.tag}!`)
  coinMarketCapClient.getTickers().then(resp => {
    resp.data.forEach(cc => {
      if (count === 1) {
        return
      }

      // one more
      count++

      const embed = new MessageEmbed()
        .setColor(0xff9900)
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
      discordClient.channels.cache.get('765490673058185231').send(embed).then(messageReaction => {
        messageReaction.react('⬆️')
        messageReaction.react('⬇️')
      })
    })
  }).catch(console.error)
})

// {
//   id: 1,
//   name: 'Bitcoin',
//   symbol: 'BTC',
//   slug: 'bitcoin',
//   num_market_pairs: 9665,
//   date_added: '2013-04-28T00:00:00.000Z',
//   tags: [Array],
//   max_supply: 21000000,
//   circulating_supply: 18522862,
//   total_supply: 18522862,
//   platform: null,
//   cmc_rank: 1,
//   last_updated: '2020-10-21T06:13:23.000Z',
//   quote: {
// USD: {
//   price: 0.23635790461673,
//   volume_24h: 6108574.14028903,
//   percent_change_1h: -0.73787822,
//   percent_change_24h: -2.56395707,
//   percent_change_7d: -8.20080531,
//   market_cap: 86881467.2086185,
//   last_updated: '2020-10-21T06:39:32.000Z'
// }
// },

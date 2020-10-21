const { Client, MessageEmbed } = require('discord.js')
const CoinMarketCap = require('coinmarketcap-api')

const config = require('./config.json')
const discordClient = new Client()
const coinMarketCapClient = new CoinMarketCap(config.coin_market_cap.api_key)

console.log('config', config)

discordClient.login(config.discord.secret_key)

discordClient.on('ready', () => {
  // console.log(`Logged in as ${client.user.tag}!`)
  coinMarketCapClient.getTickers().then(resp => {
    resp.data.forEach(cc => {
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
      // discordClient.channels.cache.get('765490673058185231').send(embed).then(messageReaction => {
      //   console.log(messageReaction)
      //   messageReaction.react('⬆️')
      //   messageReaction.react('⬇️')
      // })
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

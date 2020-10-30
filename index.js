const { Client } = require('discord.js')
const CoinMarketCap = require('coinmarketcap-api')

const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB,
  { useNewUrlParser: true, useUnifiedTopology: true })

const config = require('./config.json')
const discordClient = new Client()
const coinMarketCapClient = new CoinMarketCap(process.env.COIN_MARKET_CAP)

const messageGenerator = require('./message-generator')
const schema = require('./schemas')

console.log('config', config)

discordClient.login(process.env.DISCORD)

discordClient.on('ready', () => {
  // console.log(`Logged in as ${client.user.tag}!`)

  const now = new Date()
  let isDaily = false
  let isWeekly = false
  let isMontly = false

  coinMarketCapClient.getTickers().then(resp => {
    discordClient.channels.cache.get(config.hourly_channel).send(
      config.new_tour_message
    )
    if (now.getHours() === 0) {
      isDaily = true
      discordClient.channels.cache.get(config.daily_channel).send(
        config.new_tour_message
      )
      if (now.getDay() === 0) {
        isWeekly = true
        discordClient.channels.cache.get(config.weekly_channel).send(
          config.new_tour_message
        )
      }

      if (now.getDate() === 1) {
        isMontly = true
        discordClient.channels.cache.get(config.montly_channel).send(config.new_tour_message)
      }
    }

    resp.data.forEach(cc => {
      if (config.coins[cc.slug] === undefined) {
        return
      }

      // hourly
      discordClient.channels.cache.get(config.hourly_channel).send(
        messageGenerator.new(cc)).then(message => {
        const hourly = new schema.Hourly({
          message_id: message.id,
          price: cc.quote.USD.price
        })
        hourly.save().catch(console.error)

        message.react('⬆️')
        message.react('⬇️')
      })

      // daily
      if (isDaily) {
        discordClient.channels.cache.get(config.daily_channel).send(
          messageGenerator.new(cc)).then(message => {
          const daily = new schema.Daily({
            message_id: message.id,
            price: cc.quote.USD.price
          })
          daily.save().catch(console.error)

          message.react('⬆️')
          message.react('⬇️')
        })
      }

      // weekly
      if (isWeekly) {
        discordClient.channels.cache.get(config.weekly_channel).send(
          messageGenerator.new(cc)).then(message => {
          const weekly = new schema.Weekly({
            message_id: message.id,
            price: cc.quote.USD.price
          })
          weekly.save().catch(console.error)

          message.react('⬆️')
          message.react('⬇️')
        })
      }

      // montly
      if (isMontly) {
        discordClient.channels.cache.get(config.montly_channel).send(
          messageGenerator.new(cc)).then(message => {
          const montly = new schema.Montly({
            message_id: message.id,
            price: cc.quote.USD.price
          })
          montly.save().catch(console.error)

          message.react('⬆️')
          message.react('⬇️')
        })
      }
    })
  }).catch(console.error).then(() => {
    setTimeout(function () { process.exit(1) }, 5000)
  })
})

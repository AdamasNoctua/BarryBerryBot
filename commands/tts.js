module.exports = {
    name: '!tts',
    description: 'The bot will send a text-to-speech message to the channel. (Usage: !tts <message>)',
    execute: (msg, text) => {
        msg.channel.send(text, {tts: true})
    }
}
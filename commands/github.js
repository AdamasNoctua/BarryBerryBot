module.exports = {
    name: '!github',
    description: 'Get the link to the github page of the bot',
    execute(msg){
        msg.channel.send({embed: {
                title: 'BarryBerryBot GitHub page',
                color: 'FCE4EC',
                description: 'BBB\'s GitHub repository',
                url: 'https://github.com/AdamasNoctua/BarryBerryBot'
            }})
    }
}
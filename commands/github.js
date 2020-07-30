module.exports = {
    name: '!github',
    description: 'Get the link to the GitHub page of the bot',
    execute: msg => {
        msg.channel.send({embed: {
                title: 'BarryBerryBot GitHub page',
                color: '#ffffff',
                description: 'BBB\'s GitHub repository. Source code, issue tracking, pull requests, and additional info',
                url: 'https://github.com/AdamasNoctua/BarryBerryBot',
                // Link to the GitHub octocat image
                thumbnail: {url: 'https://github.githubassets.com/images/modules/logos_page/Octocat.png'}
            }})
    }
}
const utils = require('../utils');

module.exports = {
    name: '!pick',
    description: 'Pick a random option from the provided ones. (Usage: !pick option1 option2 etc.)',
    execute: (msg, text) => {
        let args = utils.splitArgs(text);
        if(args.length === 0){
            msg.reply('Please specify arguments')
        }
        else{
            msg.reply(`I picked ${utils.choice(args)}`)
        }
    }
}
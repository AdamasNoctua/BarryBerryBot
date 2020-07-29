const utils = require('../utils');

module.exports = {
    name: '!pick',
    description: 'Pick a random option from provided arguments. (Usage: !pick argument1 argument2 etc.)',
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
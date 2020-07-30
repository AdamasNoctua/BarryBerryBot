module.exports = {
    name: '!roll',
    description: 'Roll an X-sided die. (Usage: !roll X)',
    execute: (msg, text) => {
        let args = require('../utils').splitArgs(text);
        // Check if argument is a number
        if(isNaN(args[0])){
            msg.reply('Please enter a number')
        }
        else{
            let d = Number(args[0]);
            // Check if number is an integer
            if(!Number.isInteger(d)) {
                msg.reply('Please enter an integer');
                return;
            }
            // Check if number is greater than 0
            if(d <= 0){
                msg.reply('Please enter a number greater than 0');
                return;
            }
            let roll = require('../utils').randInt(1, d); // Roll
            msg.reply(`You rolled ${roll}`);
        }
    }
}
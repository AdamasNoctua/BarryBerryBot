const usedToday = new Set(); // Set of users who used !love today
let lastDay = new Date(); // Parameter used to check if cooldowns should be reset

module.exports = {
    name: '!love',
    description: 'BarryBerryBot loves everyone, but it loves some people more than others. Learn how much ' +
        'BBB loves you today',
    execute: msg => {
        if(!require('../utils').isToday(lastDay)){ // If the date has changed, clear the cooldown list
            lastDay = new Date();
            usedToday.clear();
        }
        // If user is on CD, send this message instead
        if(usedToday.has(msg.author.id)){
            msg.reply('*!love* is on cooldown for you, please try tomorrow :)')
        }
        else{
            usedToday.add(msg.author.id); // Add user to the list
            let text = `There is ${require('../utils').randInt(0, 100)}% love between ${msg.author} and BarryBerryBot today :heart:`;
            msg.channel.send(text, {tts: true})
        }
    }
}
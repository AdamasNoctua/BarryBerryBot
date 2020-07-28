const usedToday = new Set();
let lastDay = new Date();

module.exports = {
    name: '!love',
    description: 'BarryBerryBot loves everyone, but it loves some people more than others. Learn how much ' +
        'BBB loves you today',
    execute(msg){
        let today = new Date();
        if(lastDay.getUTCDate() !== today.getUTCDate() || lastDay.getUTCMonth() !== today.getUTCMonth() ||
        lastDay.getUTCFullYear() !== today.getUTCFullYear()){
            lastDay = today;
            usedToday.clear();
        }
        if(usedToday.has(msg.author.id)){
            msg.reply('*!love* is on cooldown for you, please try tomorrow.')
        }
        else{
            usedToday.add(msg.author.id);
            let text = `There is ${require('../utils').randInt(0, 100)}% love between ${msg.author} and BarryBerryBot today :heart:`;
            msg.channel.send(text, {tts: true})
        }
    }
}
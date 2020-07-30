const Markov = require('markov-strings').default;
const fs = require('fs');
const utils = require('../utils');

// Read training data from file and split it into sentences
let data = fs.readFileSync('bin/astrology_training.txt', 'utf-8').split(/\n/g);
// Set up Markov chain
const markov = new Markov(data, {stateSize: 2});
markov.buildCorpus();

// Markov chain option
// noinspection JSUnusedGlobalSymbols
const options = {
    maxTries: 20, // Give up if I don't have a sentence after 20 tries (default is 10)
    filter: result => {
        return result.string.split(' ').length >= 2 && result.string.endsWith('.');
    }
}

const filePath = 'bin/today_horoscope.json'; // Path to a file with today's horoscopes
const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn',
'aquarius', 'pisces']; // List of zodiac signs

/**
 * Generate horoscopes for each sign
 * @returns {{}} Dictionary where key is a zodiac sign, and value is a Markov chain generated horoscope
 */
function generateHoroscopes(){
    let result = {};
    signs.forEach(sign => {
        let tmp = '';
        let iterations = utils.randInt(3, 5);
        for(let i = 0; i < iterations; i++){
            tmp += markov.generate(options).string + ' ';
        }
        result[sign] = tmp
    });
    return result;
}

module.exports = {
    name: '!horoscope',
    description: 'Get today\'s Markov chain generated horoscope for your sign. (Usage: !horoscope <sign>)',
    execute: (msg, text) => {
        let horoscope =  {}; // Object that contains horoscope data

        /**
         * Update horoscope file with new generated ones
         */
        function updateFile(){
            horoscope = {
                lastUpdate: new Date,
                data: generateHoroscopes(),
            }
            fs.writeFileSync(filePath, JSON.stringify(horoscope))
        }
        // If file exists, read from it
        if (fs.existsSync(filePath)){
            let fileData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
            horoscope = {
                lastUpdate: new Date(fileData.lastUpdate),
                data: fileData.data
            }
            // If horoscopes haven't been updated at least since yesterday, update them
            if(!utils.isToday(horoscope.lastUpdate)) updateFile();
        }
        // If file doesn't exist create it and add
        else{
            updateFile();
        }

        let args = utils.splitArgs(text);
        if (args.length > 0){
            let sign = args[0].toLowerCase();
            if(signs.indexOf(sign) !== -1){ // Check if provided sign exists
                msg.channel.send(`**${sign.toUpperCase()}**\n${horoscope.data[sign]}`) // Send the horoscope
            }
            else{
                msg.reply(`"${sign}" is not a valid zodiac sign`)
            }
        }
        else{
            msg.reply('Please specify a zodiac sign')
        }
    }
}
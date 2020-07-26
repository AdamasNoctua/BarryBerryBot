const Markov = require('markov-strings').default;
const fs = require('fs');

// Read training data from file and split it into sentences
let data = fs.readFileSync('text/astrology_training.txt', 'utf-8').split(/\n/g);
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

module.exports = {
    name: '!horoscope',
    description: 'Get your personal horoscope for today',
    execute(msg){
        let result = '';
        let iterations = require('../utils').randInt(3, 6);
        for(let i = 0; i < iterations; i++){
            result += markov.generate(options).string + ' ';
        }
        msg.reply(result);
    }
}
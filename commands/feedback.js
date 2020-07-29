const fs = require('fs');

module.exports = {
    name: '!feedback',
    description: 'Send your suggestions and reports about the bot to the developer. (Usage: !feedback <message>)',
    execute: (msg, text) => {
        let time = new Date(); // Get current time
        time.setUTCHours(time.getHours()); // Cheesy way to deal with ISO string displaying current GTM time instead of the local one
        let dateString = time.toISOString()
            .replace(/T/, ' ') // replace T with a space
            .replace(/\..+/, '') // remove everything after the dot
        // Write the message to 'feedback.txt'
        fs.appendFile('text/feedback.txt', `[${dateString}] ${msg.author.tag}: ${text}\n`, err => {
            if(err){
                // Error handling
                console.error(err.message);
                throw err;
            }
            // Reply if everything went well
            msg.reply('Your feedback has been received!')
        })
    }
}
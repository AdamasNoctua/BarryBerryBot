const fs = require('fs');

module.exports = {
    name: '!feedback',
    description: 'Send your suggestions and reports about the bot to the developer. (Usage: !feedback <message>)',
    execute: (msg, text) => {
        let time = new Date(); // Get current time
        time.setUTCHours(time.getHours()); // Dumb way to deal with ISO string displaying current GMT+0 time instead of the system one
        let dateString = time.toISOString() // Format string into YYYY-MM-DD HH:mm:ss format
            .replace(/T/, ' ') // replace T with a space
            .replace(/\..+/, '') // remove everything after the dot
        // Write the message to 'feedback.txt'
        fs.appendFile('bin/feedback.txt', `[${dateString}] ${msg.author.tag}: ${text}\n`, err => {
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
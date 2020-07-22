/**
 *@file Main execution file of BarryBerryBot (BBB)
 */

// Get configuration from file
const config = require('./utils').getConf();

// Bot setup
const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const botCommands = require('./commands'); // Get the bot commands from 'commands' folder

bot.login(config.TOKEN); // Log the bot into Discord(tm)

// Add bot commands
Object.keys(botCommands).map(key => {
    bot.commands.set(botCommands[key].name, botCommands[key]);
});

// Add additional !help command
// Probable todo: figure out how to put it in 'commands' folder
bot.commands.set('!help', {
    name: '!help',
    description: 'Display help message',
    execute(msg, text){
        let helpText = 'Here\'s a list of currently available commands:';
        Object.keys(botCommands).map(key => {
            // Current format: **<name>** — *<description>*
            helpText += `\n**${botCommands[key].name}** — *${botCommands[key].description}*`
        })
        msg.channel.send(helpText);
    }
})

// Display message in terminal when's the bot is logged in Discord(tm)(c)
bot.on('ready', ()=>{
    console.info(`Logged as ${bot.user.tag}`)
})

// Message event handler
bot.on('message', msg => {
    if(msg.author === bot.user) return; // Check if message is sent by the bot

    // Separate command from the rest of the message
    let spaceIndex = msg.content.indexOf(' ');
    let command = '';
    let text = ''; // Is needed as arguments for some commands that require raw text
    if(spaceIndex === -1) {
        command = msg.content.toLowerCase()
    }
    else{
        command = msg.content.substr(0, spaceIndex).toLowerCase();
        text = msg.content.substr(spaceIndex+1);
    }
    // Check if sent command is available
    if (!bot.commands.has(command)) return;

    // Execute a command
    try {
        bot.commands.get(command).execute(msg, text);
    } catch (err) {
        console.error(`Error while executing ${command}: ${err.message}`);
        msg.reply('There\'s been an error with execution of your command. You can contact the developer via ' +
            '**!feedback** command or via github: TBD');
    }
})
module.exports = {
    name: '!kekw',
    description: 'KEKW',
    execute: (msg, text) => {
        msg.channel.send(text, {files: [{attachment: 'text/kekw.png'}]});
    }
}
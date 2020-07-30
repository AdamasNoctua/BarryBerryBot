module.exports = {
    name: '!kekw',
    description: 'KEKW',
    execute: (msg, text) => {
        msg.channel.send(text, {files: [{attachment: 'img/kekw.png'}]});
    }
}
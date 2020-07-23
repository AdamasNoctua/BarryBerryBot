const reddit = require('../utils').reddit;
const MessageAttachment = require('discord.js').MessageAttachment;

const subList = ['aww', 'eyebleach'];

module.exports = {
    name: '!cute',
    description: 'Get cute image from cute subreddits',
    execute(msg, text){
        let posts = [];
        let completeRequests = 0;
        for (let i = 0; i < subList.length; i++){
            reddit.hot(subList[i], 25, (data)=>{
                for(let j = 0; j < data.length; j++) {
                    if(data[j].data.post_hint === 'image') posts.push(data[j])
                }
                completeRequests++;
                if(completeRequests === subList.length){
                    let post = require('../utils').choice(posts).data;
                    let attachment = new MessageAttachment(post.url);
                    msg.channel.send(attachment);
                }
            })
        }
    }
}
const reddit = require('../utils').reddit;

// List of cute subreddits to take images from
const subList = ['aww', 'eyebleach', 'meow_irl', 'woof_irl', 'rarepuppers', 'AnimalsBeingDerps',
'AnimalsBeingBros', 'blep', 'IllegallySmolCats', 'IllegallySmolDogs', 'birbs'];

module.exports = {
    name: '!cute',
    description: 'Get a cute image from reddit dot com',
    execute: msg => {
        let posts = []; // Collection of posts from subList
        let completeRequests = 0; // Amount of completed async requests
        for (let i = 0; i < subList.length; i++){ // For each subreddit in the list
            reddit.hot(subList[i], (data)=>{ // Request 25 posts from hot
                for(let j = 0; j < data.length; j++) {
                    // Append posts only if the post is an image one
                    if(data[j].data.post_hint === 'image') posts.push(data[j])
                }
                completeRequests++;
                // When all requests are completed pick a random one and post the image to the channel
                if(completeRequests === subList.length){
                    let post = require('../utils').choice(posts).data;
                    msg.channel.send({files: [{attachment: post.url}]});
                }
            })
        }
    }
}
const request = require('request');

module.exports = {
    hot: (subreddit, limit = 25, callback) => {
        request(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=${limit}`,
            {json: true}, (err, res, body) => {
            if(err) {return console.error(err.message)}
            callback(body.data.children)
        })
    }
}
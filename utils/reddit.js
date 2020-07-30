const request = require('request');
// Temp solution until I figure out how to use functions from module index here
const userAgent = JSON.parse(require('fs').readFileSync('config.json', 'utf-8')).REDDIT['User-Agent'];

module.exports = {
    /**
     * Get hot posts from subreddit
     * @param subreddit Subreddit name
     * @param callback Callback function
     * @param limit Limit of post requests (default: 25, max: 100)
     */
    hot: (subreddit, callback, limit = 25) => {
        request(`https://www.reddit.com/r/${subreddit}/hot/.json?limit=${limit}`,
            {json: true, headers: {"User-Agent": userAgent}}, (err, res, body) => {
            if(err) {return console.error(err.message)}
            callback(body.data.children)
        })
    }
}
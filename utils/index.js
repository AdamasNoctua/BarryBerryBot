/**
 * @module This module contains a set of functions that are repeatedly used in program
 */

const fs = require('fs');

module.exports = {
    reddit: require('./reddit'),
    /**
     * Get configuration object from config file
     * @returns {any} Config object
     */
    getConf: () => {
        return JSON.parse(fs.readFileSync('config.json', 'utf-8'))
    },
    /**
     * Generate a random integer between from range [min, max]
     * @param min Minimum value of random integer
     * @param max Maximum value of random integer
     * @returns {number} Random integer
     */
    randInt: (min, max) => {
        return Math.floor((Math.random() * max) + min)
    },
    /**
     * Pick random object from array
     * @param array Array to pick a random object from
     * @returns {*} Random object from array
     */
    choice: array => {
        return array[module.exports.randInt(0, array.length - 1)]
    },
    /**
     * Split text into arguments
     * @param text String that contains arguments.
     * @returns {string[]|*[]} Array of arguments
     */
    splitArgs: text => {
        let trimmed = text.trim();
        if(trimmed.length === 0) return []; // Without it empty string split returns ['']
        return trimmed.split(/\s+/)
    }
}
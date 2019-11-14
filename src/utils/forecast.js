const request = require('request');

const forecast = (lat, long, callback) => {
    const url = `https://api.darksky.net/forecast/504a724e769ae5bc3e5d7d1fa81fcdab/${lat},${long}`;

    request({url, json: true}, ( error, {body}) => {
        if (error) { callback ('Check internet connection', undefined)}

        else if (body.error) {
            callback('Invalid location', undefined)}

        else {
            const currentTemp = body.currently.temperature;
            const rainChance = body.currently.precipProbability;
            const daily = body.daily.data[0].summary;
            const forecast = `${daily}. It is currently ${currentTemp} degrees out. There is a ${rainChance}% chance of rain`;
            callback (undefined, forecast)}
    })
};

module.exports = forecast;
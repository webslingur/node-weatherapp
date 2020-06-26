const request = require("request");

const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/forecast?access_key=3c429a26f9cd42a3d83b0c39a70a1298&query=${latitude},${longitude}`;
    console.log(url);
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback("Unable to connect!!!");
        } else if (body && body.current && !body.current.weather_descriptions.length) {
            callback("Unable to connect to location services!!!");
        } else {
            callback(undefined, `${body.current.weather_descriptions[0]}, Current temperature is ${body.current.temperature} & there are ${body.current.precip}% chance of rain`);
        }
    })
}

module.exports = forecast;
const { DynamoDB } = require('aws-sdk');
const AWS = require('aws-sdk');
const axios = require('axios').default;

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

const API_KEY = 'd7ddeacadb92ac7050707148253560fb';

AWS.config.update({region: 'eu-west-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

const getWeather = async (location) => {
    return axios.get(`${BASE_URL}?q=${location}&appid=${API_KEY}`).data;
};

const convert = (o) => {
    const res = {};

    Object.keys(o)
        .forEach(k => {
            res[k] = convertSingle(o[k]);
        });

    return res;
}

const convertSingle = (v) => {
    switch (typeof v) {
        case 'number':
            return { N: v };
        case 'string':
            return { S: v };
        case 'object':
            if (Array.isArray(v)) {
                return {
                    L: v.map(convertSingle)
                }
            }
            return { M: convert(v) };
    }
}

exports.handler = async () => {
    const weather = convert(getWeather('larne,uk'));
    if (weather) {
        await  new Promise((resolve, reject) => {
                    const params = {
                        TableName: 'weather',
                        Item: weather
                    };
                    console.log('putting');
                    ddb.putItem(params, (err, data) => {
                        console.log('done1');
                        if (err) {
                            console.log("Error", err);
                            reject(err);
                        } else {
                            console.log("Success", data);
                            resolve(data);
                        }
                    });
                });
        console.log('done');
    }
}

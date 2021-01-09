const AWS = require('aws-sdk');
const axios = require('axios').default;

const BASE_URL = 'http://api.openweathermap.org/data/2.5/weather';

AWS.config.update({region: 'eu-west-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const ssm = new AWS.SSM({region: 'eu-west-1'});

const getWeather = async (location, apiKey) => {
    const res = await axios.get(`${BASE_URL}?q=${location}&appid=${apiKey}`);
    return res.data
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
            return { N: `${v}` };
        case 'string':
            return { S: `${v}` };
        case 'object':
            if (Array.isArray(v)) {
                return {
                    L: v.map(convertSingle)
                }
            }
            return { M: convert(v) };
    }
}

const getParameter = async(key) => {
    const res =  await ssm.getParameter({ Name: key, WithDecryption: true }).promise();
    return res.Parameter.Value;
}

exports.handler = async () => {
    const weather = convert(await getWeather('larne,uk', await getParameter('weather_map_api_key')));
    weather.id.S = `${weather.id.N}`;
    delete weather.id.N;
    
    if (weather) {
        const params = {
                TableName: 'weather',
                Item: weather
            };
                    
        await ddb.putItem(params).promise();
        console.log('done');
    }
}

const AWS = require('aws-sdk');
const axios = require('axios').default;

const BASE_URL = 'https://eu-https.topband-cloud.com/ember-back';
const TABLE_NAME = 'ember';

AWS.config.update({region: 'eu-west-1'});
const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
const ssm = new AWS.SSM({region: 'eu-west-1'});


const login = async (userName, password) => {
    const res = await axios.post(`${BASE_URL}/appLogin/login`, { userName, password });

    if (res && res.data && res.data.data) {
        return res.data.data.token;
    }
    return null;
};

const getHomes = async (token) => {
    const res = await axios.get(`${BASE_URL}/homes/list`, { headers: { Authorization: token } });
    if (res && res.data) {
    return res.data.data;
    }
    return null;
}

const getZones = async (token, gateway) => {
    const res = await axios.post(`${BASE_URL}/zones/polling`, { gateWayId: gateway }, { headers: { Authorization: token } });
    if (res && res.data) {
        return res.data.data;
    }
    return null;
}

const getParameter = async(key) => {
    const res =  await ssm.getParameter({ Name: key, WithDecryption: true }).promise();
    return res.Parameter.Value;
}

exports.handler = async () => {
    const userName = await getParameter('ember_username');
    const password = await getParameter('ember_password');
    
    const token = await login(userName, password);
    if (!token) {
        throw Error('No login token');
    }

    const homes = await getHomes(token);
    if (!homes) {
        throw new Error('No homes found');
    }

    // TODO: for now just use 1st home
    const zones = await getZones(token, homes[0].gatewayid);
    if (zones) {
        await Promise.all(zones.map((z) => {
                return {
                    sensorId: { S: `${z.zoneid}` },
                    name: { S: `${z.name}` },
                    isHotWater: { BOOL: z.ishotwater },
                    temperature: { N: `${z.currenttemperature}` },
                    target: { N: `${z.targettemperature}` },
                    status: { N: `${z.status}` },
                    time: { N: `${new Date().getTime()}` }
                }
            })
            .map((z) => {
                    const params = {
                        TableName: TABLE_NAME,
                        Item: z
                    };
                    return ddb.putItem(params).promise();
                }));
        console.log('done');
    }
}

const axios = require('axios');

const API_KEY = '8d40d857fefeebdd8e9837222ce7bdcd'
const DOMAIN = 'http://api.marketstack.com/v1';

const cotacao = (symbol, callback) => {
    
    const url = `${DOMAIN}/eod?access_key=${API_KEY}&symbols=${symbol}`
    let statusCode = 0;

    axios.get(url).then((response) => { 
        if(response.data === undefined || response.data.data.length === 0) {
            statusCode = 404;
            throw new Error('No data found')
        }
        const retorno = response.data.data[0];
        statusCode = 200;
        callback({
            retorno,
            statusCode
        });
    }).catch((error) => {
        if(statusCode != 404) {
            statusCode = 500;
        }
        callback({
            message: error.message,
            statusCode
        })
    })
}

module.exports = cotacao
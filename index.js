require('babel-polyfill');
require('dotenv').config();

axios = require('axios');

const createRequest = (input, callback) => {

    // Performing a GET request
    axios.get('http://metals-api.com/api/latest?base=USD&symbols=XAU,XAG&access_key=' + process.env.API_KEY, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .catch(function (error) {
            callback(500, {
                jobRunID: input.id,
                status: "errored",
                error: "Error querying Metals-API",
                statusCode: 500
            });
        })
        .then(function(response){
            jsonData = {};
            jsonData['goldspot'] = response.data.rates.XAU;

            callback(200, {
                jobRunID: input.id,
                data: jsonData,
                statusCode: 200
            });
        });

};

exports.metalsservice = (req, res) => {
    createRequest(req.body, (statusCode, data) => {
        res.status(statusCode).send(data);
    });
};

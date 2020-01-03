const express = require('express');
const bodyParser = require('body-parser');
const adapter = require('./index');

require ('dotenv').config();

const app = express();
app.use(bodyParser.json());

app.post('/goldspot/hourly', function (req, res) {
    adapter.metalsservice(req, res);
});

let listener = app.listen(process.env.PORT || 6221, function () {
    console.log("Quandl adapter listening on", listener.address().address + listener.address().port);
});

process.on('SIGINT', function () {
    process.exit();
});

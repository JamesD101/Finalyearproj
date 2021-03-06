const express = require('express');
const app = express();
// set port number for backend
const port = 8080;
const mongoose = require('mongoose');
const path = require('path');
const config = require('./config/database');
//import express router
const router = express.Router();
//import authentication routes
const authentication = require('./routes/aauthentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
// set mongoose promise into global
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect(config.uri, function (err) {
    if (err){
        console.log('Could not connect to the database ', err);
    } else {
        console.log('Connected to the database ', config.db);
    }
});

//MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:8081'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(express.static(__dirname + '/frontend/dist'));

app.use('/aauthentication', authentication);



app.get('*', function(req,res) {
    // to send the frontend file to the backend
    res.sendFile(path.join(__dirname + '/frontend/dist/index.html'));
});


app.listen(port, function () {
    console.log('Listening on port ' + port) ;
});
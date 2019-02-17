const express = require('express');
// set port number for backend
const port = 4000;
// require mongoose
const mongoose = require('mongoose');
// require path
const path = require('path');
// require config
const config = require('./config/database');
//import express router
const router = express.Router();
const crypto = require('crypto');
//import authentication routes
const bauthentication = require('./routes/bauthentication')(router);
// require bodyparser
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');

const app = express();

mongoose.Promise = global.Promise;
//connect to database
mongoose.connect(config.uri, function (err) {
    if (err){
        console.log('Could not connect to the database ', err);
    } else {
        console.log('Connected to the database ', config.db);
    }
});

// MIDDLEWARE
//MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:4001'
}));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/bfrontend/dist'));

app.use('/bauthentication', bauthentication);



app.get('*', function(req,res) {
    // to send the frontend file to the backend
    res.sendFile(path.join(__dirname + '/bfrontend/dist/index.html'));
});


app.listen(port, function () {
    console.log('Listening on port ' + port) ;
});
const express = require('express');
// set port number for backend
const port = 4000;
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const config = require('./config/database');
//import express router
const router = express.Router();
//import authentication routes
const bauthentication = require('./routes/bauthentication')(router);
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

const app = express();
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

// Create mongodb connection
const conn = mongoose.createConnection(config.uri);

// Init stream
let gfs;

conn.once('open', () => {
    // Init stream
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
        url: config.uri,
        file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
            if (err) {
                return reject(err);
            }
            const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
            filename: filename,
            bucketName: 'uploads'
            };
            resolve(fileInfo);
            });
        });
        }
});
const upload = multer({ storage });


//MIDDLEWARE
app.use(cors({
    origin: 'http://localhost:4001'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use(express.static(__dirname + '/frontend/dist'));

app.use('/bauthentication', bauthentication);



app.get('*', function(req,res) {
    // to send the frontend file to the backend
    res.sendFile(path.join(__dirname + '/frontend/dist/index.html'));
});


app.listen(port, function () {
    console.log('Listening on port ' + port) ;
});
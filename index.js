const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

// Set up mongoose connection
const mongoose = require('mongoose');

let dev_db_url = 'mongodb://industryuser:industry1@ds149414.mlab.com:49414/industrydb';
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const app = express();

var originsWhitelist = [
    'http://localhost:4200'
];

var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }

  //here is the magic
app.use(cors(corsOptions));

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

app.use(allowCrossDomain);

const user = require('./routes/user.route');
const device = require('./routes/device.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/user', user);
app.use('/device',device);


app.use('/', (req, res) => {
    res.send("This is industry");
});



// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});


let port = process.env.PORT || 5050;
app.listen(port, () => {
    console.log(`Server started on port`+port);
});


module.exports = app;
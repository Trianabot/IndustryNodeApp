const mongoose = require('mongoose');
const Schema =  mongoose.Schema;

let DeviceSchema = new Schema({
    oillevel: {
        type: String, 
        required: true
    },
    temperature: {
        type: String, 
        required: true
    },
    humidity: {
        type: String, 
        required: true
    },
    vibration: {
        type: String,
        required: true
    },
    oillife: {
        type: String, 
        required: true
    },
    time: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Device',DeviceSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserLoginInfo = new Schema({
    userid: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    emailid: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    passwordattempts: {
        type: Number,
        required: true
    },
    isLocked: {
        type: Boolean,
        required: false
    },
    sysCreatedDate: {
        type: String,
        required: true
    },
    sysUpdatedDate: {
        type: String,
        required: true
    },
    VersionNumber: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Logininfo',UserLoginInfo);
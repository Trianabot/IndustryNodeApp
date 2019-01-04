const express = require('express');
const router = express.Router();

const device_controller = require('../controllers/device.controller')

router.get('/testdevice', device_controller.testdevice);

router.get('/getdevicedata', device_controller.getdevice_data);

router.post('/adddevicedata', device_controller.insert_devicedata);


module.exports = router;
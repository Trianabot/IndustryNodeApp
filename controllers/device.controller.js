const DeviceModel = require('../models/device.model');


exports.testdevice = (req,res) => {
        res.send('This is device data');
}

/**Add device data to database */

exports.insert_devicedata = (req, res, next) => {
    let device = new DeviceModel(
        {
            oillevel: req.body.oillevel,
            temperature: req.body.temperature,
            humidity: req.body.humidity,
            vibration: req.body.vibration,
            oillife: req.body.oillife,
            time: new Date()
        }
    );
    device.save(function (err, device) {
        if (err) {
            return next(err);
        }else if(device == [] || device == ''){
            res.send("No data inserted");
        }
        res.send(device);
    });
}

exports.getdevice_data = (req,res,next) => {
    DeviceModel.find({},{ _id: 0 },{ sort : { $natural : -1 }, limit : 10 },function(err,result){
        if (err) {
            return next(err);
        }else if(result == [] || result == ''){
            res.send("No data found");
        }
        else if(!result){
            res.send("No data found");
        }
        else {
            res.send(result);
        }
        
    });
};
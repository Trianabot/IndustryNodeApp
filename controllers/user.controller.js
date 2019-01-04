const UserRegisterModel = require('../models/userregister.model');
const LoginInfoModel = require('../models/logininfo.model');
const uuid = require('uuid4');
const jwt = require('jsonwebtoken');


exports.testuser = (req, res) => {
    res.send('this is user data');
}


/** To register the user and store in database */

exports.register_user = (req,res,next) => {
    var id = uuid();
    try {
        let registeruser = new UserRegisterModel(
            {
                userid: id,
                username: req.body.name,
                password: req.body.password,
                age: req.body.age,
                gender: req.body.gender,
                state: req.body.state,
                emailid: req.body.emailid,
                phone: req.body.phone,
                syscreatedby: id,
                sysupdatedby: id,
                syscreateddate: new Date(),
                sysupdateddate: new Date(),
                versionnumber: req.body.versionnumber
            }
        );

        registeruser.save((err, userdata) => {
            if (!err) {
                logininfo(req, userdata);
            } else {
                if (err.code == 11000)
                    res.status(422).send({ message: 'Duplicate email adrress found.' });
                else
                    return next(err);
            }

        });
    } catch (e) {
        log.error('Route /users/ failed with error', e);
        res.status(500).send(e);
    }


    function logininfo(reqs, userdata) {

        var logininfo = new LoginInfoModel(
            {
                userid: id,
                username: reqs.body.name,
                emailid: reqs.body.emailid,
                password: reqs.body.password,
                passwordattempts: 1,
                isLocked: false,
                sysCreatedDate: new Date(),
                sysUpdatedDate: new Date(),
                VersionNumber: reqs.body.versionnumber
            }
        );

        logininfo.save((err, logindata) => {
            if (!err)
                res.send({ message: "user resgistered succesfully", user_data: userdata, login_data: logindata });
            else {
                if (err.code == 11000)
                    res.status(422).send({ message: 'Duplicate email adrress found.' });
                else
                    return next(err);
            }

        });
    }
};

exports.authenticate_user = (req, res, next) => {
    LoginInfoModel.findOne({
        emailid: req.body.emailid,
        password: req.body.password
    }, (err, user) => {
        if (err) throw err;

        if (!user) {
            res.send({ success: false, msg: 'Authentication failed. Wrong credentials' });
        } else {
            var token = jwt.sign({ emailid: user.emailid }, 'trianabot');
            var data = {
                success: true,
                msg: "Authenticated",
                emailid: user.emailid,
                token: token
            };
            res.send(data);
        }

    });
};


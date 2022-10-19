const jwt = require("jsonwebtoken");

exports.generateToken = (userInfo) =>{
    // json accepts 3 parameters 1 -> payload(body) 2-> secret, 3-> option
    const payload = {
        email: userInfo.email,
        role : userInfo.role,
    };

    const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "60s",
    });

    return token ;
};
const jwt = require("jsonwebtoken");
const {promisify} = require("util");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    console.log(token);

    if(!token){
        return res.status(401).josn({
            status: "Failed",
            error: "You are not logged in!",
        });
    };


    const decodedData = await promisify(jwt.verify)(token, process.env.TOKEN_SECRET);
    
    req.user = decodedData;
    next();

  } catch (error) {
    res.status(403).json({
      status: "Failed",
      error: "Invalid Token",
    });
  }
};

const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.model");
const { findUserByEmail } = require("../services/user.services");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).josn({
        status: "Failed",
        error: "You are not logged in!",
      });
    }

    const decodedData = await promisify(jwt.verify)(
      token,
      process.env.TOKEN_SECRET
    );

    const user = await findUserByEmail(decodedData.email);

    req.user = user;
    next();
  } catch (error) {
    res.status(403).json({
      status: "Failed",
      error: "Invalid Token",
    });
  }
};

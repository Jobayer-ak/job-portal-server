const bcrypt = require("bcryptjs");
const { signupService } = require("../services/user.services");

// signup
exports.signup = async (req, res) => {
  try {
    const user = await signupService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully registered",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error,
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check email and password are provided
    if (!email || !password) {
      return res.status(401).json({
        status: "Failed",
        error: "Please provide your username and password",
      });
    }

    // load user with email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({
        status: "Failed",
        error: "No user fond! Please create an account",
      });
    }

    // is password valid?
    const isPasswordValid = user.comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Failed",
        error: "Password is not correct!",
      });
    };

    // generate token 

    res.status(200).json({
      status: "Success",
      message: "Successfully loggedin",
      data: {
        user: isObjectIdOrHexString,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error,
    });
  }
};

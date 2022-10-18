const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.userSchema({
  firstName: {
    type: String,
    required: [true, "Please provide a first name"],
    trim: true,
    minLength: [3, "Name must be at least 3 characters"],
    maxLength: [40, "Name is too large"],
  },
  lastName: {
    type: String,
    required: [true, "Please provide last name"],
    trim: true,
    minLength: [3, "Please provide last name"],
    maxLength: [40, "Name is too large"],
  },
  email: {
    type: String,
    validate: [validator.isEmail, "Provide a valid Email!"],
    trim: true,
    lowercase: true,
    unique: true,
    required: [true, "Email address is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    validate: {
      validator: (value) =>
        validator.isStrongPassword(value, {
          minLength: 6,
          minLowercase: 3,
          minNumbers: 1,
          minUppercase: 1,
          minSymbol: 1,
        }),
      messae: "Password {VALUE} is not strong enough.",
    },
  },
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: (value) => value === this.password,
      message: "Password doesn't match",
    },
  },
  role: {
    type: String,
    enum: ["admin, candidate, hiringmanager"],
    default: "candidate",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;

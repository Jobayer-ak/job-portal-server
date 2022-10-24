const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const ObjectId = mongoose.Types.ObjectId;

const userSchema = mongoose.Schema(
  {
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
      trim: true,
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
      trim: true,
      required: [true, "Please confirm your password"],
      validate: {
        validator: function (value) {
          return value === this.password;
        },
        message: "Passwords doesn't match!",
      },
    },
    contactNumber: {
      type: String,
      validate: [
        validator.isMobilePhone,
        "Please provide a valid contact number!",
      ],
      required: true,
    },
    shippingAddress: String,

    imageURL: {
      type: String,
      validate: [validator.isURL, "Please provide a valid url"],
    },
    role: {
      type: String,
      enum: {
        values: ["candidate", "hiring-manager", "admin"],
        message: "role value cannot be {VALUE}",
      },
      default: "candidate",
    },
    appliedJobs: [
      {
        type: ObjectId,
        ref: "Job",
      },
    ],
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const hashedPassword = bcrypt.hashSync(password);

  this.password = hashedPassword;
  this.confirmPassword = undefined;

  next();
});

userSchema.methods.comparePassword = function (password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

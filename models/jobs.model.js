const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const jobsSchema = mongoose.Schema(
  {
    jobType: {
      type: String,
      required: true,
      lowercase: true,
      minLength: [3, "Title name must be 3 characters"],
      maxLength: [60, "Title name is too large"],
    },
    title: {
      type: String,
      required: true,
      lowercase: true,
      minLength: [3, "Title name must be 3 characters"],
      maxLength: [60, "Title name is too large"],
    },
    location: {
      type: String,
      required: true,
      lowercase: true,
      minLength: [3, "Title name must be 3 characters"],
      maxLength: [100, "Title name is too large"],
    },
    jobDescription: {
      type: String,
      required: true,
      lowercase: true,
      minLength: [50, "Job Description must be 50 characters"],
      maxLength: [1000, "Job Description is too large"],
    },
    salary: {
      type: Number,
      required: [true, "Salaray is required"],
      min: [0, "Salary cannot be negative"],
    },
    deadline: {
      type: Date,
      required: true,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    appliedCandidates: [
      {
        applicantId: {
          type: ObjectId,
          ref: "User",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobsSchema);

module.exports = Job;

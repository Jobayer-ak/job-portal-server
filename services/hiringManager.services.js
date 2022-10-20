const Job = require("../models/jobs.model");
const User = require("../models/user.model");

exports.postJobService = async (jobInfo) => {
  const job = await Job.create(jobInfo);
  return job;
};

exports.getAllJobsService = async (email) => {
  const { _id } = await User.findOne({ email });

  const jobs = await Job.find({ postedBy: _id });

  return jobs;
};

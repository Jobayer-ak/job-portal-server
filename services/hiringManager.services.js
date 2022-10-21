const Job = require("../models/jobs.model");
const User = require("../models/user.model");

exports.postJobService = async (jobInfo) => {
  const job = await Job.create(jobInfo);
  return job;
};

exports.getAllJobsService = async (userId) => {
  const { _id } = await User.findOne({ _id: userId });

  const jobs = await Job.find({ postedBy: _id });

  return jobs;
};

exports.getJobByIdService = async (jobId) => {
  const job = await Job.findOne({ _id: jobId });
  return job;
};

exports.updateJobById = async (data, userId, jobId) => {
  const job = await Job.findOne({ postedBy: userId });

console.log(job);

  const updatedJob = await Job.updateOne({ _id: jobId }, data, {
    runValidators: true,
  });

  // return updatedJob;
};

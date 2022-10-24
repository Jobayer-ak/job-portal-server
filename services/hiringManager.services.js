const Job = require("../models/jobs.model");
const User = require("../models/user.model");

// create job service
exports.postJobService = async (jobInfo) => {
  const job = await Job.create(jobInfo);
  return job;
};

// get all job service
exports.getAllJobsService = async (userId) => {
  const { _id } = await User.findOne({ _id: userId });

  const jobs = await Job.find({ postedBy: _id });

  return jobs;
};

// get job by id service
exports.getJobByIdService = async (jobId) => {
  const job = await Job.findOne({ _id: jobId }).populate(
    "appliedCandidates",
    " -password -createdAt -updatedAt"
  );
  return job;
};

// update job service
exports.updateJobById = async (data, userId, jobId) => {
  const job = await Job.findOne({ _id: jobId });
  let updatedJob = {};

  if (job.postedBy.toString() === userId.toString()) {
    console.log("Matched");
    updatedJob = await Job.updateOne({ _id: jobId }, data, {
      runValidators: true,
    });
  }

  return updatedJob;
};

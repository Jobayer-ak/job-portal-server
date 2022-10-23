const mongoose = require("mongoose");
const Job = require("../models/jobs.model");
const ObjectId = mongoose.Types.ObjectId;

// get all jobs
exports.getAllJobsService = async (filters, queries) => {
  const jobs = await Job.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy);
  return jobs;
};

// get specific job
exports.getJobByIdService = async (jobId) => {
  const job = await Job.findOne({ _id: jobId }).populate("postedBy", "-password -_id -createdAt -updatedAt")

  // const job = await Job.aggregate([
  //   {$match: {_id: ObjectId(jobId)}}
  // ])

  return job;
};

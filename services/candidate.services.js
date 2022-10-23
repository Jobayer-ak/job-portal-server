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
  const job = await Job.findById(jobId).populate(
    "postedBy",
    "-password -_id -createdAt -updatedAt"
  );

  // const job = await Job.aggregate([
  //   {$match: {_id: ObjectId(jobId)}}
  // ])

  return job;
};

// appy a job
exports.applyAJobService = async (jobId, candidateId) => {
  const checkAppliedUser = await Job.findById(jobId);

  let applyStatus = true;

  if (checkAppliedUser.appliedCandidates.length === 0) {
    await Job.findByIdAndUpdate(
      jobId,
      { $push: { appliedCandidates: candidateId } },
      {
        runValidators: true,
      }
    );
    return (applyStatus = false);
  } else {
    checkAppliedUser.appliedCandidates.forEach((candidate) => {
      if (candidateId.toString() === candidate.toString()) {
        return (applyStatus = true);
      } else {
        Job.findByIdAndUpdate(
          jobId,
          { $push: { appliedCandidates: candidateId } },
          {
            runValidators: true,
          }
        );

        return (applyStatus = false);
      }
    });
  }

  return applyStatus;
};

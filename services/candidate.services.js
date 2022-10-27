// const multer = require("multer");
const mongoose = require("mongoose");
const uploader = require("../middlewares/uploader");
const Job = require("../models/jobs.model");
const User = require("../models/user.model");
const ObjectId = mongoose.Types.ObjectId;
// const path = require("path");

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

// apply a job
exports.applyAJobService = async (jobId, candidateId) => {
  const checkAppliedUser = await Job.findById(jobId);

  let applyStatus;

  // check date remains or not
  const todayDate = new Date();

  if (todayDate > checkAppliedUser.deadline) {
    return (applyStatus = "over");
  }

  // store applied job's id
  const applicant = await User.findById(candidateId);

  if (applicant.appliedJobs.length == 0) {
    await User.findByIdAndUpdate(
      candidateId,
      {
        $push: { appliedJobs: jobId },
      },
      { runValidators: true }
    );

    return (applyStatus = false);
  } else {
    applicant.appliedJobs.forEach(async (job) => {
      if (job.toString() === jobId.toString()) {
        return (applyStatus = true);
      } else {
        await User.findByIdAndUpdate(
          candidateId,
          {
            $addToSet: { appliedJobs: jobId },
          },
          { runValidators: true }
        );

        return (applyStatus = false);
      }
    });
  }

  // store applied candidate's id
  if (checkAppliedUser.appliedCandidates.length == 0) {
    uploader.single("image");
    await Job.findByIdAndUpdate(
      jobId,
      { $push: { appliedCandidates: candidateId } },
      {
        runValidators: true,
      }
    );

    return (applyStatus = false);
  } else {
    checkAppliedUser.appliedCandidates.forEach(async (candidate) => {
      if (candidateId.toString() == candidate.toString()) {
        console.log(candidate + " --> " + candidateId);
        return (applyStatus = true);
      } else {
        await Job.findByIdAndUpdate(
          jobId,
          { $addToSet: { appliedCandidates: candidateId } },
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

// upload resume service
// exports.uploadResumeService = async (candidateId, resumeString) => {
//   const result = await User.findByIdAndUpdate(
//     candidateId,
//     {resume: resumeString},
//     { runValidators: true }
//   );

//   console.log(result);

//   return result;
// };

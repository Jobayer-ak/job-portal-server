const User = require("../models/user.model");

// get all candidates
exports.getAllCandidatesService = async () => {
  const candidates = await User.find({ role: "candidate" })
    .select("-password ")
    .populate("appliedJobs", "-appliedCandidates -createdAt -updatedAt");

  return candidates;
};

// get a candidate by id
exports.getACandidateByIdService = async (candidateId) => {
  const candidate = await User.findById(candidateId).select("-password");

  return candidate;
};

// get all hiring manager
exports.getAllHiringManagerService = async () => {
  const managers = await User.find({role: "hiring-manager"}, "-appliedJobs -password");
  return managers;
};

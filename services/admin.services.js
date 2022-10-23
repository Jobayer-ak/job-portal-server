const User = require("../models/user.model");

// get all candidates
exports.getAllCandidatesService = async () => {
  const candidates = await User.find({ role: "candidate" }).select(
    "-password "
  );

  return candidates;
};

// get a candidate by id
exports.getACandidateByIdService = async (candidateId) =>{

    const candidate = await User.findById(candidateId).select("-password");

    

    return candidate;
}

const User = require("../models/user.model");

exports.getAllCandidatesService = async () => {
  const candidates = await User.find({ role: "candidate" }).select(
    "-password "
  );

  console.log(candidates);
  return candidates;
};


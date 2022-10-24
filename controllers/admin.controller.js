const {
  getAllCandidatesService,
  getACandidateByIdService,
  getAllHiringManagerService,
} = require("../services/admin.services");

// get all candidates
exports.getAllCandidates = async (req, res) => {
  try {
    const candidates = await getAllCandidatesService();

    res.status(200).json({
      status: "Success",
      candidates,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

// get a candidate by id
exports.getACandidateById = async (req, res) => {
  try {
    const { id } = req.params;
    const candidate = await getACandidateByIdService(id);

    res.status(200).json({
      status: "Success",
      candidate,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

// get all hiring manager
exports.getAllHiringManager = async (req, res) => {
  try {

    const hiringManagers = await getAllHiringManagerService();

    res.status(200).json({
      status: "Success",
      hiringManagers,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

const {
  getAllCandidatesService,
  getACandidateByIdService,
  getAllHiringManagerService,
  updateUserToHManagerService,
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

    if (candidate.role === "candidate") {
      return res.status(200).json({
        status: "Success",
        candidate,
      });
    }

    res.status(404).json({
      status: "Failed",
      message: "This is not candidate!",
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

// update user role to hiring-manager
exports.updateUserToHManager = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (req.body.role === "hiring-manager") {
      const updatedRole = await updateUserToHManagerService(id, req.body);

      if (updatedRole.modifiedCount) {
        return res.status(200).json({
          status: "Success",
          message: "Successfully updated user role to hiring-manager",
        });
      }

      return res.status(400).json({
        status: "Failed",
        message: "Something is wrong!",
      });
    }

    res.status(200).json({
      status: "Success",
      message: `User role must be "hiring-manager" not "${role}"!`,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

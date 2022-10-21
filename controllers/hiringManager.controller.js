const {
  postJobService,
  getAllJobsService,
  getJobByIdService,
} = require("../services/hiringManager.services");

// creating job
exports.postJob = async (req, res) => {
  try {
    const job = await postJobService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Job is posted successfully!",
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

// get all jobs by manager id
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await getAllJobsService(req.user._id);

    res.status(200).json({
      status: "Success",
      jobs: jobs,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

// get job with id
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await getJobByIdService(req.user._id, id);

    console.log(job.postedBy + " ----> " + req.user._id);

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(404).json({
        status: "Failed",
        message: "You didn't post this job!",
      });
    }

    res.status(200).json({
      status: "Success",
      jobs: job,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

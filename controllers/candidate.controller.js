const {
  getAllJobsService,
  getJobByIdService,
  applyAJobService,
  uploadResumeService,
} = require("../services/candidate.services");

// get all jobs
exports.getAllJobs = async (req, res) => {
  try {
    let filters = { ...req.query };

    // {price: {$lt:5000}}
    let filtersString = JSON.stringify(filters);
    filtersString = filtersString.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (match) => `$${match}`
    );

    console.log(filtersString);

    filters = JSON.parse(filtersString);

    const queries = {};

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      queries.sortBy = sortBy;
      console.log(sortBy);
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      queries.fields = fields;
      console.log(fields);
    }

    const jobs = await getAllJobsService(filters, queries);

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

// get specific job with id
exports.getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    const job = await getJobByIdService(id);

    res.status(200).json({
      status: "Success",
      job: job,
    });
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

// apply a job
exports.applyAJob = async (req, res) => {
  try {
    const { id } = req.params;

    const candidateId = req.user._id;

    const appliedJob = await applyAJobService(id, candidateId);

    if (appliedJob === "over") {
      return res.status(400).json({
        status: "Failed",
        message: "Applying date is over. You cannot apply this job!",
      });
    }

    if (appliedJob) {
      return res.status(400).json({
        status: "Failed",
        message: "You already applied this job!",
      });
    } else {
      return res.status(200).json({
        status: "Success",
        appliedJob: "Successfully You Applied This Job!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: "Failed",
      error: error.message,
    });
  }
};

// resume upload
exports.uploadResume = async (req, res) => {
  try {
    const candidateId = req.user._id;
    const resume = await uploadResumeService(candidateId, req.file.filename);
    console.log(req.file.filename)
    return res.status(200).json(req.file);
  } catch (error) {
    res.status(400).json({
      status: "Failed",
      error: error.message + "Problem",
    });
  }
};

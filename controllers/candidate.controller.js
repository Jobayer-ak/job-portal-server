const {
  getAllJobsService,
  getJobByIdService,
} = require("../services/candidate.services");

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

// apply job
exports.applyJob = async (req, res) =>{
  try {
    
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
}
const Job = require("../models/jobs.model");

exports.getAllJobsService = async(filters, queries) =>{
    const jobs = await Job.find(filters)
    .select(queries.fields)
    .sort(queries.sortBy);
    return jobs;
}
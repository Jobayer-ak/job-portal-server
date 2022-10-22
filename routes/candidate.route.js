const express = require("express");
const router = express.Router();
const candidateControllers = require("../controllers/candidate.controller");
const authorization = require("../middlewar/authorization");
const verifyToken = require("../middlewar/verifyToken");

router.get("/jobs",verifyToken, authorization("candidate"), candidateControllers.getAllJobs)

router.get("/jobs/:id", verifyToken, authorization("candidate"), candidateControllers.getJobById
)

module.exports = router;
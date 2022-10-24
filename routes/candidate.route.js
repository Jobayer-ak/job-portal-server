const express = require("express");
const router = express.Router();
const candidateControllers = require("../controllers/candidate.controller");
const authorization = require("../middlewares/authorization");
const verifyToken = require("../middlewares/verifyToken");

router.get(
  "/jobs",
  verifyToken,
  authorization("candidate"),
  candidateControllers.getAllJobs
);

router.get(
  "/jobs/:id",
  verifyToken,
  authorization("candidate"),
  candidateControllers.getJobById
);

router.post(
  "/jobs/:id/apply",
  verifyToken,
  authorization("candidate"),
  candidateControllers.applyAJob
);

module.exports = router;

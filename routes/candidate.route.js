const express = require("express");
const multer = require("multer");
const router = express.Router();
const candidateControllers = require("../controllers/candidate.controller");
const authorization = require("../middlewares/authorization");
const uploader = require("../middlewares/uploader");
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

// router.post("/upload-resume", verifyToken, authorization("candidate"), uploader.single("pdf"), candidateControllers.uploadResume);

router.post(
  "/jobs/:id/apply",
  verifyToken,
  authorization("candidate"),
  candidateControllers.applyAJob
);

module.exports = router;

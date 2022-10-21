const express = require("express");
const router = express.Router();
const hiringManagerController = require("../controllers/hiringManager.controller");
const authorization = require("../middlewar/authorization");
const verifyToken = require("../middlewar/verifyToken");
const { route } = require("./user.route");

router.get(
  "/manager/jobs",
  verifyToken,
  authorization("hiring-manager"),
  hiringManagerController.getAllJobs
);
router.post(
  "/jobs",
  verifyToken,
  authorization("hiring-manager"),
  hiringManagerController.postJob
);

router.get(
  "/manager/jobs/:id",
  verifyToken,
  authorization("hiring-manager"),
  hiringManagerController.getJobById
);

module.exports = router;

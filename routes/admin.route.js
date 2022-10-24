const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin.controller");
const authorization = require("../middlewares/authorization");
const verifyToken = require("../middlewares/verifyToken");

router.get(
  "/candidate",
  verifyToken,
  authorization("admin"),
  adminControllers.getAllCandidates
);

router.get(
  "/manager",
  verifyToken,
  authorization("admin"),
  adminControllers.getAllHiringManager
);

router
  .get(
    "/candidate/:id",
    verifyToken,
    authorization("admin"),
    adminControllers.getACandidateById
  )
  .patch(
    "/candidate/roleUpdate/:id",
    verifyToken,
    authorization("admin"),
    adminControllers.updateUserToHManager
  );

module.exports = router;

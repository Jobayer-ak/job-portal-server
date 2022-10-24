const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin.controller");
const authorization = require("../middlewar/authorization");
const verifyToken = require("../middlewar/verifyToken");

router.get("/candidate",verifyToken, authorization("admin"), adminControllers.getAllCandidates);

router.get("/manager", verifyToken, authorization("admin"), adminControllers.getAllHiringManager);

router.get("/candidate/:id", verifyToken, authorization("admin"), adminControllers.getACandidateById);

module.exports = router; 
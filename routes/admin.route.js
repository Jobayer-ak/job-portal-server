const express = require("express");
const router = express.Router();
const adminControllers = require("../controllers/admin.controller");
const authorization = require("../middlewar/authorization");
const verifyToken = require("../middlewar/verifyToken");

router.get("/candidate",verifyToken, authorization("admin"), adminControllers.getAllCandidates);

module.exports = router;
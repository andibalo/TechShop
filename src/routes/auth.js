const express = require("express");
const router = express.Router();

const { createOrUpdateUser } = require("../controllers/auth");
const { validateToken } = require("../middlewares/auth");

router.post("/user", validateToken, createOrUpdateUser);

module.exports = router;

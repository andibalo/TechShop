const express = require("express");
const router = express.Router();

const { createOrUpdateUser, currentUser } = require("../controllers/auth");
const { validateToken } = require("../middlewares/auth");

router.post("/user", validateToken, createOrUpdateUser);

router.get("/current-user", validateToken, currentUser);

module.exports = router;

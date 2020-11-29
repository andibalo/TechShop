const express = require("express");
const router = express.Router();

const { createOrUpdateUser, currentUser } = require("../controllers/auth");
const { validateToken, validateAdmin } = require("../middlewares/auth");

router.post("/user", validateToken, createOrUpdateUser);

router.get("/current-user", validateToken, currentUser);

router.get("/current-admin", validateToken, validateAdmin, currentUser);

module.exports = router;

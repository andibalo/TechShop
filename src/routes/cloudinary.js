const express = require("express");
const router = express.Router();

const { validateToken, validateAdmin } = require("../middlewares/auth");
const { upload, remove } = require("../controllers/cloudinary");

router.post("/uploadimages", validateToken, validateAdmin, upload);
router.post("/deleteimage", validateToken, validateAdmin, remove);

module.exports = router;

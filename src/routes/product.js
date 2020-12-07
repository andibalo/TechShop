const express = require("express");
const router = express.Router();

const { create, read } = require("../controllers/product");

const { validateToken, validateAdmin } = require("../middlewares/auth");

router.post("/product", validateToken, validateAdmin, create);
router.get("/products", read);

module.exports = router;

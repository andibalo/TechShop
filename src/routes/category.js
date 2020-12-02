const express = require("express");
const router = express.Router();

const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/category");

const { validateToken, validateAdmin } = require("../middlewares/auth");

router.post("/category", validateToken, validateAdmin, create);

router.put("/category/:slug", validateToken, validateAdmin, update);

router.delete("/category/:slug", validateToken, validateAdmin, remove);

router.get("/category/:slug", validateToken, validateAdmin, read);

router.get("/categories", list);

module.exports = router;

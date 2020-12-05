const express = require("express");
const router = express.Router();

const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/subcategory");

const { validateToken, validateAdmin } = require("../middlewares/auth");

router.post("/subcategory", validateToken, validateAdmin, create);

router.put("/subcategory/:slug", validateToken, validateAdmin, update);

router.delete("/subcategory/:slug", validateToken, validateAdmin, remove);

router.get("/subcategory/:slug", validateToken, validateAdmin, read);

router.get("/subcategories", list);

module.exports = router;

const express = require("express");
const router = express.Router();

const {
  create,
  list,
  remove,
  read,
  update,
  listWithOpts,
  productsCount,
  rateProduct,
  listRelated,
} = require("../controllers/product");

const { validateToken, validateAdmin } = require("../middlewares/auth");

router.post("/product", validateToken, validateAdmin, create);
router.post("/products", listWithOpts);
router.get("/products/total", productsCount);
router.put("/product/rating/:productId", validateToken, rateProduct);
router.get("/products/:count", list);
router.delete("/product/:slug", remove);
router.get("/product/:slug", read);
router.put("/product/:slug", validateToken, validateAdmin, update);
router.get("/products/related/:productId", listRelated);

module.exports = router;

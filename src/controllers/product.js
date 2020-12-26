const Product = require("../models/Product");
const Category = require("../models/Category");
const Subcategory = require("../models/Subcategory");
const User = require("../models/User");
const slugify = require("slugify");

exports.create = async (req, res) => {
  try {
    req.body.slug = slugify(req.body.title);
    const product = await new Product(req.body).save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Create product failed");
  }
};

exports.list = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subcategories")
      .sort([["createdAt", "desc"]]);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).send("Could not get products");
  }
};

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({ slug: req.params.slug });

    res.status(200).json(deleted);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("subcategories");

    if (!product) {
      return res.status(400).send("Product not found");
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.update = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
};

exports.listWithOpts = async (req, res) => {
  try {
    //sort = createdAt
    //order = desc/asc
    const { page, order, sort } = req.body;

    //Current page is either sent by client or has nitial value of 1
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subcategories")
      .sort([[sort, order]])
      .limit(perPage);

    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.productsCount = async (req, res) => {
  const total = await Product.estimatedDocumentCount();

  res.status(200).json(total);
};

exports.rateProduct = async (req, res) => {
  const { star } = req.body;

  try {
    const product = await Product.findById(req.params.productId);
    const user = await User.findOne({ email: req.user.email });

    const currentUserRating = product.ratings.find(
      (rating) => rating.postedBy.toString() === user._id.toString()
    );

    //Add to ratings array
    if (!currentUserRating) {
      product.ratings.push({ star, postedBy: user._id });

      await product.save();

      return res.status(200).json(product);
    }

    //Update rating in ratings array

    currentUserRating.star = star;

    const updateIndex = product.ratings
      .map((rating) => rating.postedBy.toString())
      .indexOf(currentUserRating.postedBy.toString());

    product.ratings[updateIndex] = currentUserRating;

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.listRelated = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category,
    })
      .populate("category")
      .populate("subcategories")
      .populate("postedBy")
      .limit(3);

    res.status(200).json(related);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.getProductsByCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    if (!category) {
      return res.status(400).send("Category not found");
    }

    const products = await Product.find({ category: category._id });

    res.status(200).json({ category, products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

exports.getProductsBySubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({ slug: req.params.slug });

    if (!subcategory) {
      return res.status(400).send("Subcategory not found");
    }

    const products = await Product.find({ subcategories: subcategory });

    res.status(200).json({ subcategory, products });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category")
    .populate("subcategories")
    .populate("postedBy");

  return res.status(200).json(products);
};

const handleCategory = async (req, res, category) => {
  const products = await Product.find({ category })
    .populate("category")
    .populate("subcategories")
    .populate("postedBy");

  return res.status(200).json(products);
};

const handleRating = async (req, res, stars) => {
  //$PROJECT method passes along the documents with the specified fields or newly created ones
  //it is guaranteed to have the _id property from the original document
  //to the next stage of the pipeline
  //$$ROOT refers to the original document
  //aggregaate method is a pipeline that does multiple operations to the documents and returns the proccesed documents

  try {
    const aggregates = await Product.aggregate([
      {
        $project: {
          document: "$$ROOT",
          floorAverage: {
            $floor: {
              $avg: "$ratings.star",
            },
          },
        },
      },
      {
        $match: {
          floorAverage: stars,
        },
      },
    ]).limit(12);
    //console.log(aggregates);
    const products = await Product.find({ _id: aggregates })
      .populate("category")
      .populate("subcategories")
      .populate("postedBy");

    //console.log(products);
    res.status(200).json(products);
  } catch (error) {
    console.log(error);

    res.status(500).json(error);
  }
};

const handlePrice = async (req, res, price) => {
  const products = await Product.find({
    price: {
      $gte: price[0],
      $lte: price[1],
    },
  })
    .populate("category")
    .populate("subcategories")
    .populate("postedBy");

  return res.status(200).json(products);
};

const handleSubcategory = async (req, res, subcategory) => {
  const products = await Product.find({ subcategories: subcategory })
    .populate("category")
    .populate("subcategories")
    .populate("postedBy")
    .limit(12);
  res.status(200).json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category")
    .populate("subcategories")
    .populate("postedBy")
    .limit(12);

  res.status(200).json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category")
    .populate("subcategories")
    .populate("postedBy")
    .limit(12);

  res.status(200).json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category")
    .populate("subcategories")
    .populate("postedBy")
    .limit(12);

  res.status(200).json(products);
};

exports.searchFilters = async (req, res) => {
  const {
    query,
    price,
    category,
    stars,
    subcategory,
    shipping,
    color,
    brand,
  } = req.body;
  //console.log(req.body);

  if (shipping) {
    return await handleShipping(req, res, shipping);
  }

  if (color) {
    return await handleColor(req, res, color);
  }

  if (brand) {
    return await handleBrand(req, res, brand);
  }

  if (subcategory) {
    return await handleSubcategory(req, res, subcategory);
  }

  if (category && category.length > 0) {
    return await handleCategory(req, res, category);
  }

  if (stars) {
    return await handleRating(req, res, stars);
  }

  if (price) {
    return await handlePrice(req, res, price);
  }

  if (query) {
    await handleQuery(req, res, query);
  }

  const products = await Product.find()
    .populate("category")
    .populate("subcategories")
    .populate("postedBy")
    .limit(12);

  return res.status(200).json(products);
};

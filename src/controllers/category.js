const Category = require("../models/Category");
const slugify = require("slugify");
const { findOneAndUpdate } = require("../models/Category");

exports.create = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await new Category({ name, slug: slugify(name) }).save();

    res.status(200).json(category);
  } catch (error) {
    res.status(500).send("Failed to create category");
  }
};

exports.list = async (req, res) => {
  try {
    const categories = await Category.find({}).sort({ createdAt: -1 });

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server error");
  }
};

exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });

    res.status(200).json(category);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;

  try {
    const updated = await findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name) },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    console.log(error);
    res.status(200).send(error.message);
  }
};

exports.remove = async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      slug: req.params.slug,
    });

    res.status(200).json(deletedCategory);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

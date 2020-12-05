const Subcategory = require("../models/Subcategory");
const slugify = require("slugify");

exports.create = async (req, res) => {
  const { name, parent } = req.body;

  //console.log(parent);
  try {
    const subcategory = await new Subcategory({
      name,
      slug: slugify(name),
      parent,
    }).save();

    res.status(200).json(subcategory);
  } catch (error) {
    console.log(error);
    res.status(500).send("Failed to create subcategory");
  }
};

exports.list = async (req, res) => {
  try {
    const subcategories = await Subcategory.find({}).sort({ createdAt: -1 });

    res.status(200).json(subcategories);
  } catch (error) {
    console.log(error);

    res.status(500).send("Server error");
  }
};

exports.read = async (req, res) => {
  try {
    const subcategory = await Subcategory.findOne({ slug: req.params.slug });

    res.status(200).json(subcategory);
  } catch (error) {
    console.log(error);

    res.status(500).send(error.message);
  }
};

exports.update = async (req, res) => {
  const { name, parent } = req.body;

  try {
    const updated = await Subcategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slugify(name), parent },
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
    const deletedSubcategory = await Subcategory.findOneAndDelete({
      slug: req.params.slug,
    });

    res.status(200).json(deletedSubcategory);
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

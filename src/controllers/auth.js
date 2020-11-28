const { findOne } = require("../models/User");
const User = require("../models/User");

exports.createOrUpdateUser = async (req, res) => {
  const { picture, name, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name, picture },
    { new: true }
  );

  if (user) {
    return res.status(200).json(user);
  }

  const newUser = await new User({
    picture,
    email,
    name,
  }).save();

  res.status(200).json(newUser);
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

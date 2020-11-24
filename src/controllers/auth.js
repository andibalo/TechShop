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

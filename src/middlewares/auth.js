const admin = require("../firebase/index");
const User = require("../models/User");

exports.validateToken = async (req, res, next) => {
  //Validate Token will validate the firebase token sent from client in the req headers
  //console.log(req.headers);
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    //console.log(firebaseUser);
    req.user = firebaseUser;

    next();
  } catch (error) {
    //console.log(error);

    res.status(401).json({
      msg: "User token not valid",
    });
  }
};

exports.validateAdmin = async (req, res, next) => {
  const { email } = req.user;

  try {
    const user = await User.findOne({ email });

    if (user.role !== "admin") {
      return res.status(403).json({ error: "This user is not authorized!" });
    }

    next();
  } catch (error) {
    return res.status(500).json(error);
  }
};

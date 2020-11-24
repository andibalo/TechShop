const admin = require("../firebase/index");

exports.validateToken = async (req, res, next) => {
  //Validate Token will validate the firebase token sent from client in the req headers

  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);

    //console.log(firebaseUser);
    req.user = firebaseUser;

    next();
  } catch (error) {
    console.log(error);

    res.status(401).json({
      msg: "User token not valid",
    });
  }
};

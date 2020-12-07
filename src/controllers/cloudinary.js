const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.upload = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.body.image, {
      public_id: `${Date.now()}`, //Id given to the returneed image url
      resource_type: "auto",
    });

    res.status(200).json({
      public_id: result.public_id,
      url: result.secure_url,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("could not upload image");
  }
};

exports.remove = (req, res) => {
  const image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    console.log("Error", err);
    console.log("Rsult", result);
    if (err.result !== "ok") {
      return res.status(500).json({ success: false, err });
    }

    res.status(200).send("Successfully deleted image");
  });
};

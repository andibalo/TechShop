const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const fs = require("fs");
require("dotenv").config();

const app = express();

//ConnectDB
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connectDb();

//Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));

//Autoload routes
fs.readdirSync("./src/routes").map((file) => {
  app.use("/api", require("./src/routes/" + file));
});

//Serve static assest in production
if (process.env.NODE_ENV === "production") {
  //set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started in port ${port}`);
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const zoomcarRoutes = require("./src/routes/app.routes");

const app = express();
const port = process.env.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
mongoose.set("strictQuery", false);

// routes
app.use(zoomcarRoutes);

mongoose.connect(process.env.DB_URL, () => {
  console.log("db connected");
  app.listen(port, () => {
    console.log("server running on port", port);
  });
});

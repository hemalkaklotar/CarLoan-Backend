require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true }));


const db = require("./config/db.config");
app.use("/", require("./routes"));
db.sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.listen(3001, () => {
  console.log("Sever is running on port 3001");
});

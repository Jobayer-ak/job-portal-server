const express = require("express");
const cors = require("cors");
const colors = require("colors");
const databaseConnection = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8001;


// middlewares
app.use(express.json());
app.use(cors());

// routes


// database connection
databaseConnection();

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

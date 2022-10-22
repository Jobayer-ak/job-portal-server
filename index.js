const express = require("express");
const cors = require("cors");
const colors = require("colors");
const databaseConnection = require("./db");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 9000;


// middlewares
app.use(express.json());
app.use(cors());

// routes
const userRoute = require("./routes/user.route");
const hiringManagerRoute = require("./routes/hiringManager.route");
const candidateRoute = require("./routes/candidate.route");

// database connection
databaseConnection();

// api call
app.use("/api/v1/user", userRoute);
app.use("/api/v1/", hiringManagerRoute);
app.use("/api/v1/", candidateRoute);

app.listen(port, () => {
  console.log(`App is running on port ${port}`.yellow.bold);
});

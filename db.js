const mongoose = require("mongoose");
const colors = require("colors");

const databaseConnection = () => {
  const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.epohc9s.mongodb.net/JobPortal`;

  mongoose.connect(url).then(() => {
    console.log(`Database is connected successfully!`.red.bold);
  });
};

module.exports = databaseConnection;

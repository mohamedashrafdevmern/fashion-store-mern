

require("dotenv").config();

const mongoose = require("mongoose");

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async () => {
  const maxAttempts = 5;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 30000,
        connectTimeoutMS: 20000,
      });

      console.log("MongoDB connected successfully");
      return;
    } catch (error) {
      console.error(
        `MongoDB connection attempt ${attempt}/${maxAttempts} failed:`,
        error.message
      );

      if (attempt === maxAttempts) {
        throw error;
      }

      await wait(5000);
    }
  }
};

module.exports = connectDB;




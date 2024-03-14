import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to database...");
  } catch (err) {
    console.error(`Error connecting to the database: ${err.message}`);
  }
};

export default connectToDB;

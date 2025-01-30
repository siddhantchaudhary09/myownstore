import mongoose from "mongoose";

const connection = {};

export default async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, "", {});
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
    process.exit(1);
  }
}

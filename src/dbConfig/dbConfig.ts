import mongoose from "mongoose";

export default async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MOngoDB connected successfully");
    });

    connection.on("error", (error) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running " + error
      );
      process.exit();
    });
  } catch (error) {
    console.log("Somthing went wrong!");
    console.log(error);
  }
}

import mongoose from "mongoose";

let isConnected = false;
export const dbConnect = async () => {
  mongoose.set("strictQuery", false);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: "WebWidgets",
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("DB connected ");
  } catch (error) {
    console.log(error);
  }
};

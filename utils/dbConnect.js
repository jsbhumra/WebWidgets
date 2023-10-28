// const { MongoClient, ServerApiVersion } = require("mongodb");
// const uri = process.env.DB_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// async function dbConnect() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// // run().catch(console.dir);
// export default dbConnect;

//----------------------------------------------------------------2nd
// import mongoose from "mongoose";

// const MONGODB_URI = process.env.DB_URI;

// if (!MONGODB_URI) {
//   throw new Error("Please define the MONGODB_URI environment variable");
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }
//   cached.conn = await cached.promise;
//   console.log("Connectted to DB");
//   return cached.conn;
// }
// export default dbConnect;

//----------------------------------------------------------------3rd
// import mongoose from "mongoose";

// const dbConnect = (handler) => async (req, res) => {
//   // Use new db connection
//   await mongoose.connect(process.env.DB_URI, {
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//     useCreateIndex: true,
//     useNewUrlParser: true,
//   });
//   console.log("HERE");
//   return handler(req, res);
// };

// export default dbConnect;

//----------------------------------------------------------------4th

import mongoose from "mongoose";

let isConnected = false;
export const dbConnect = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: "WebWidgets",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("DB connected ");
  } catch (error) {
    console.log(error);
  }
};

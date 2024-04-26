import mongoose from "mongoose";

export const connectDB = async()=>{
  const {connection} = await mongoose.connect(process.env.ATLASDB_URL);
  // const { connection } = await mongoose.connect(
  //   "mongodb://127.0.0.1:27017/shrihariayurvedadham"
  // );

  console.log(`MongoDb is connected with ${connection.port}`);
}
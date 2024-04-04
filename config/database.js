import mongoose from "mongoose";

export const connectDB = async()=>{
  const {connection} = await mongoose.connect(process.env.ATLASDB_URL);
  console.log(`MongoDb is connected with ${connection.host}`);
}
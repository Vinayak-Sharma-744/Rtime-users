import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const mongo = process.env.DATABASE_URL
const connectDatabase = () => new Promise((resolve, reject) => {
  mongoose.connect(String(mongo))
    .then(response => resolve(response))
    .catch(err => reject(err))
})

export default connectDatabase;



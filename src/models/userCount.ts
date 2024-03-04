import mongoose from "mongoose"

const userCountSchema= new mongoose.Schema({
  "activeUser": {
    type: Number,
    require: true
  },
  "inactiveUser": {
    type: Number,
    require: true
  },
  "totalUser": {
    type: Number,
    require: true
  }
}, { timestamps: true });

const UserCount = mongoose.model("usercount", userCountSchema);

export default UserCount;
import mongoose, { Schema } from 'mongoose';
import UserType from "../library/userType";

// employee schema 
const employeeSchema: Schema = new mongoose.Schema({
  "email": {
    type: String,
    required: true
  },
  "name": {
    type: String,
    required: true
  },
  "profilePic": {
    type: String,      
  },
  "role": {
    type: Schema.Types.ObjectId,
    ref: "role"
    // required: true
  },
  "status": {
    type: Boolean,
    default: true,
    required: true
  },
  "theme": {
    type: Boolean//true: light false: dark
  },
  "phone": {
    type: String
  },
  "time": {
    type: String
  },
  "isLogin": {
    type: Boolean
  },
  "emp_id": {
    type: String,
    required: true
  },
  "ip": {
    type: String,
    required: true
  }
},{timestamps: true});

// employee collection  
const Employee = mongoose.model<UserType>("employee", employeeSchema);
export default Employee;




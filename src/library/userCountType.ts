import {Document } from "mongoose"
interface UserCountType extends Document {
  activeUser: number ,
  inactiveUser: number ,
  totalUser: number 
}

export default UserCountType
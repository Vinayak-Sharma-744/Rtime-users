import { Document, Schema } from 'mongoose';

interface  UserType extends Document {
  name: string,
  email: string,
  profilePic?: string,
  role: Schema.Types.ObjectId,
  status: boolean,
  theme?: boolean,
  phone?: number,
  time?: string,
  isLogin: Boolean,
  emp_id: string
}

export default UserType;
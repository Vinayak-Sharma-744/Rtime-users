import {Schema, model} from "mongoose";

export interface IRole{
    name:string,
    description:string,
    permissions:string[],
    status:string
}

const roleSchema = new Schema<IRole>({
    // name of the role
    name:{
        type:String,
        required:true
    },
    // description of the role
    description:{
        type:String,
        required:true
    },
    // permissions of the role
     permissions:{
        type: [String],
        default:[]
     },
    // status of the role either active or inactive
    status:{
        type:String,
        enum: ["ACTIVE","INACTIVE"],
        default: "ACTIVE"
    }
},{timestamps: true});

// created role model
const Role = model<IRole>("role",roleSchema);
export default Role;
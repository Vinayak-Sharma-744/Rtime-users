import mongoose, {model,Schema} from "mongoose";

const permisssionSchema = new Schema({
     // permission title
    title: {
        type:String,
        required:true
    },
    // permission description
    description: { 
        type:String
    },
    // permission status
    status: { 
        type:String,
        enum:["ACTIVE","INACTIVE"],
        default:"ACTIVE"
    },
    value: [{
        type: String,
        lowercase: true
    }]
});

// created permission model
const permissionModel = model("permission",permisssionSchema);
export default permissionModel;
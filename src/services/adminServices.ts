import Employee from "../models/employee"
import Role from "../models/role";
import UserCount from "../models/userCount"
import UserType from "../library/userType";
import { Document, ObjectId } from "mongoose";

//update role of user only admin
export const updateUserRole = (email: string, role: string):Promise<UserType | null> =>  new Promise ((resolve, reject) =>  {
  getRoleByName(role)
  .then(response => {
    const {_id} = response as {_id : String};
    return Employee.findOneAndUpdate({email}, {"role": _id},{ returnOriginal: false });
  })
  .then(response => resolve(response))
  .catch(err => reject(err))
})


//get user by email only admin
export const getUser = (searchTerm: string, page: number, lim: number):Promise<UserType[] > =>  new Promise((resolve, reject) =>{
  if(!searchTerm)  {
    Employee.find().populate("role").skip((page - 1) * lim).limit(lim)
    .then((response) => resolve(response))
    .catch(err => reject(err))
  }else  {
    Employee.find({
      $or: [
        { email: searchTerm },
        { name: searchTerm },
        { emp_id: searchTerm }
      ]
    }).populate("role").skip((page - 1) * lim).limit(lim)
    .then((response) => resolve(response))
    .catch(err => reject(err)); 
  }
})

//block user only admin-- puchna hai
export const enableDisableUser = (email: string, status: boolean): Promise<UserType | null> =>  new Promise((resolve, reject) =>  {
  Employee.findOneAndUpdate({email}, {status}, { returnOriginal: false })
  .then((response) => resolve(response))
  .catch(err => reject(err))
})


//recent 5 user  only admin
export const recentUser = ():Promise<UserType[] | null> =>  new Promise ((resolve, reject) => {
  Employee.find({status: true, isLogin: true}).sort({"createdAt": -1}).populate("role").limit(5)
  .then(response => resolve(response))
  .catch(err => reject(err))
})

// total users
export const totalUser = (): Promise<number> =>  new Promise ((resolve, reject) =>{
  UserCount.findOne().sort({"createdAt": -1}).limit(1)
  .then((response: any) => resolve(response.totalUser))
  .catch(err => reject(err))
})
 
// active users
export const activeUser = (): Promise<number> =>  new Promise ((resolve, reject) =>{
  UserCount.findOne().sort({"createdAt": -1}).limit(1)
  .then((response: any) => resolve(response.activeUser))
  .catch(err => reject(err))
})

// inactive users
export const inactiveUser = (): Promise<number> =>  new Promise ((resolve, reject) =>{
  UserCount.findOne().sort({"createdAt": -1}).limit(1)
  .then((response: any) => resolve(response.inactiveUser))
  .catch(err => reject(err))
})

//role
export const getAllRole = async () => new Promise<Document | null>((resolve, reject) => {
  Role.find()
    .then((response: any) => {
      resolve(response);
    })
    .catch((error: Error) => {
      reject(error);
    });
});
// create a Role By admin
export const createRole = async (name: string, description: string, permissions: Array<string>, status: string) => new Promise<Document | null>((resolve, reject) => {
  Role.create({
    name,
    description,
    permissions,
    status
  })
    .then((response: Document | null) => {
      resolve(response);
    })
    .catch((error: Error) => {
      reject(error);
    });
});
// get Role by Name by admin
export const getRoleByName = async (name: string) => new Promise<Document | null>((resolve, reject) => {
  Role.findOne({ name })
    .then((response: Document | null) => {
      resolve(response);
    })
    .catch((error: Error) => {
      reject(error);
    });
});
// update role information by admin
export const updateRole = async (name: string, description: string, permissions: Array<string>, status: string) => new Promise<Document | null>((resolve, reject) => {
  Role.findOne({ name })
    .then((response: any) => {
      if (!response) {
        reject(response);
      }
      const mergePermission = response.permissions.concat(permissions);
      return Role.findOneAndUpdate({ name }, { description, permissions: mergePermission, status }, { new: true })
    })
    .then((response: Document | null) => {
      resolve(response);
    })
    .catch((error: Error) => {
      reject(resolve)
    });
});
// delete role by admin
export const deleteRole = async (name: string) => new Promise<Document | null>((resolve, reject) => {
  Role.findOneAndUpdate({ name }, { "status": "INACTIVE" }, { new: true })
    .then((response: Document | null) => {
      resolve(response);
    })
    .catch((error: Error) => {
      reject(error);
    });
});
// get role by id by admin
export const getRoleById = async (_id: string): Promise<Document | null> => {
  return new Promise((resolve, reject) => {
    Role.findOne({ _id })
      .then((response: Document | null) => {
        resolve(response);
      })
      .catch((error: Error) => {
        reject(error);
      });
  });
};

export const getUserByRole = (name:string)=> new Promise((resolve,reject)=>{
  Role.find({name})
    .then((response:any)=>{
      const roleId = response[0]._id;
      return Employee.find({role:roleId})
    })
    .then((response)=>{
      resolve(response)
    })
    .catch((err:Error)=> reject(err))
})
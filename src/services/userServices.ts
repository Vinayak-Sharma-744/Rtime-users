import Employee from "../models/employee";
import jwt from "jsonwebtoken";
import {getRoleByName, getUser} from "./adminServices";
import UserType from "../library/userType";
import { generateEmployeeId } from "../helper/helper";

// create a employee  
export const createUser = ((data: UserType):Promise<String[] | UserType | null | undefined> =>  new Promise((resolve, reject) =>  {
  getUser(data.email, 1, 20)
    .then((response) => {
      if(response.length)  {
        return loginUser(response[0])
        .then(result => resolve(result))
        .catch(err => reject(err))
      }else  {
        return generateEmployeeId()
        .then((emp_id) => {
          data.emp_id = emp_id;
          console.log(emp_id)
          return getRoleByName("User");
        })
        .then((role: any) => {
          data.role = role._id;
          return Employee.create(data);
        })  
        .then((user) => {
          const {_id} = user as {_id: string};
          return jwt.sign({"id": _id}, process.env.SECRET_KEY as string,{ expiresIn: '30d'} ,(err, token) => {
            if(err)  {
              return reject(err)                                  
            }else  {
              return userIsLogin(_id, true)
              .then((response: any) => resolve([token, response.role.name]))
              .catch(err => reject(err))
            }
          })
        })
      }
    })
    .catch(err => reject(err))
  })
)

// get user by Id  only user 
export const getUserById = (_id: string): Promise<UserType | null> =>  new Promise((resolve, reject) =>  {
  Employee.findOne({_id, status: true}).populate("role")
  .then((response) => resolve(response))
  .catch(err => reject(err))
})

//login user
export const loginUser = (user: any): Promise<String[] | undefined> =>  new Promise((resolve, reject) =>  {
  if(user.status)  {
    if(user.isLogin)  {
      return reject({"message":"You are already loggedIn."})
    }else  {
      const {_id} = user as {_id: string};
      const roleName: any = user.role.name ;
      return jwt.sign({"id": _id}, process.env.SECRET_KEY as string,{ expiresIn: '30d'} ,(err, token) => {
        if(err)  {
          return reject(err)
        }else  {
          return userIsLogin(_id, true)
          .then(response => resolve([token, roleName]))
          .catch(err => reject(err))
        }
      })
    }
  }else  {
    return reject({"message":"User is Disabled by admin"})
  }
})

//update user (time, phone, theme)
export const updateUser = (_id: string, data: any): Promise<UserType | null> =>  new Promise((resolve, reject) =>  {
  Employee.findOneAndUpdate({_id}, data, { returnOriginal: false })
  .then((response) => resolve(response))
  .catch(err => reject(err))
})

//handle login logout session
export const userIsLogin = (_id: string, isLogin: boolean): Promise<UserType | null> => new Promise((resolve, reject) =>  {
  Employee.findOneAndUpdate({_id}, {isLogin}, { returnOriginal: false })
  .then((response) => resolve(response))
  .catch(err => reject(err))
})




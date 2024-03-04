import UserCount from "../models/userCount";
import Employee from "../models/employee";
import UserCountType from "../library/userCountType";
import UserType from "../library/userType";

//update user count in database
export const updateUserCount = (data: UserCountType) => new Promise((resolve , reject) =>  {
  UserCount.create(data)
    .then((response) => resolve(response))
    .catch(err => reject(err))
})

//count all employee 
export const totalUserCount = (): Promise<number> =>  new Promise((resolve, reject) =>  {
  Employee.countDocuments()
      .then(response  =>  resolve(response))
      .catch(err  =>  reject(err)) 
})

//count active user
export const activeUserCount = (): Promise<number>  =>  new Promise((resolve, reject) =>  {
  Employee.countDocuments({status: true})
      .then(response  =>  resolve(response))
      .catch(err  =>  reject(err))
})
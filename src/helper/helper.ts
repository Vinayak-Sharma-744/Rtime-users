import { Response } from "express";
import {totalUserCount, activeUserCount, updateUserCount} from "../services/userCountServices";
import Employee from "../models/employee"

//for sending response to client
export const sendResponse = (res: Response, statusCode: number, success: boolean, err: any, result: any) =>  {
  return res.status(statusCode).send({
    success,
    err,
    result
  });
}

//cron job for count user every day at 12:00am
export const countUserCron = async () => { 
  console.log("cron is running for counting user");
  try {
    const totalUser: number = await totalUserCount(); 
    const activeUser: number = await activeUserCount(); 
    const inactiveUser = totalUser  - activeUser;
    const result: any = {activeUser, inactiveUser, totalUser};
    const response = await updateUserCount(result);
    console.log(response); 
  } catch (err) {
    console.log(err); 
  }
};


//employe id generator
export const generateEmployeeId = (): Promise<string> =>  new Promise ((resolve, reject) => {
  Employee.find().sort({"createdAt": -1}).limit(1)
  .then((users) =>  {
    let prevId = parseInt(users[0].emp_id.split("_")[1]) || 0;
    let code: string = "RTPL_";
    if(prevId < 10)   {
      code = "RTPL_";
      code = code + "00";
      prevId++;
      let result = code + prevId;
      resolve(result);
    }
    if(prevId < 100)  {
      code = "RTPL_";
      code = code + "0";
      prevId++;
      let result = code + prevId;
      console.log("2--",result)
      resolve(result);
    }
    code = "RTPL_";
    prevId++;
    let result = code + prevId;
    console.log("3--",  result)
    resolve(result);
  })
  .catch(err => reject(err));
})
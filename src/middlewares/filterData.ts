import { Request, Response, NextFunction } from "express";
import { getRoleByName } from "../services/adminServices";
import { createUser } from "../services/userServices";
import { sendResponse } from "../helper/helper";
import UserType from "../library/userType";

const filterData = async (req: any, res: Response) => {
  if (req.user) {
    getRoleByName("User")
      .then((result:any) => {
        const roleId = result._id
        const user: any = {
          name: (req.user as any).displayName,
          email: (req.user as any).emails[0].value,
          profilePic: (req.user as any).photos[0].value,
          role:roleId,
          status: true,
          emp_id: "",
          time: "",
        }
        return  createUser(user);
      })
      .then((result) => sendResponse(res, 200, true, "",result))
      .catch((err) => sendResponse(res, 400, false, err.message, undefined));
  } else {
    return sendResponse(res, 400, false, "user not found",undefined);
  }
}
export default filterData;
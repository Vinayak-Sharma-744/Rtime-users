import { Request, Response, NextFunction } from "express";
import Routes from "../controllers/lib/path";
import { getUser } from "../services/adminServices";
import { sendResponse } from "../helper/helper";
import { getUserById } from "../services/userServices";

export const checkPermission = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {path} = req;
    const userId = req.headers.userId as string;
    const userData:any = await getUserById(userId)
    console.log(userData.role.name);
    const routeData = Routes.find(route => route.role === userData.role.name && route.path === path);
    console.log(routeData);
    if(!routeData){
      return sendResponse(res, 403, false, "Permission denied", null);
    }else{
      if(userData.role.permissions.includes(routeData?.permission)){
        next();
      }else{
        return sendResponse(res, 403, false, "Permission denied", null);
      }
    }
  }
  catch (err: any) {
    return sendResponse(res, 500, false, err.message, null);
  }
}
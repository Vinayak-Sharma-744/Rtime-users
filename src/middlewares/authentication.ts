import {Request, Response, NextFunction} from "express";
import {sendResponse} from "../helper/helper";
import jwt from "jsonwebtoken";
import { getUserById } from "../services/userServices";



const authentication = (req: Request, res: Response, next: NextFunction) =>  {
  const token: string | undefined = req.headers.authorization?.split(" ")[1];
  console.log(req.headers)
  if(!token)  {
    return sendResponse(res, 401, false, "Token is not found",null)
  }else  {
    return jwt.verify(token, String(process.env.SECRET_KEY), (err, decoded) => {
      if(err)  {
        return sendResponse(res, 401, false, err,null);
      }else  {
        const {id} = decoded as {id: string};
        req.headers.userId = id;
        req.headers.token = token;
        req.headers.ip = req.socket.remoteAddress;
        console.log(req.headers.ip)
        return getUserById(id)
          .then((response) => {
            if(response)  {
              if(response.isLogin)  {
                return next();
              }else  {
                return sendResponse(res, 400, false, "User is not login", null)
              }
            }else  {
              return sendResponse(res, 400, false, "Token is not authenticated", null)
            }
          })
          .catch(err => sendResponse(res, 400, false, err.message, null))
      }
    })
  }
}

export default authentication;
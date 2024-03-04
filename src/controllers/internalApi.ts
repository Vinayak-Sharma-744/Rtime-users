import express,{Request, Response} from "express"
import { getUserByRole } from "../services/adminServices"
import { sendResponse } from "../helper/helper";
import { getUser } from "../services/adminServices";
import { getUserById } from "../services/userServices";
const routerInternalApi = express.Router();


routerInternalApi.get("/getUserById", (req: Request, res: Response) =>  {
  getUserById(req.query.userId as string)
  .then(response => sendResponse(res, 200, true, null, response))
  .catch(err => sendResponse(res, 400, false, err.message, null))
})

// get employee --admin
routerInternalApi.get("/users", (req: Request, res: Response) =>  {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  getUser(req.query.searchTerm as string, page as number, limit as number)
    .then(response => sendResponse(res, 200, true, null, response))
    .catch(err => sendResponse(res, 400, false, err.message, null))
})

routerInternalApi.get("/userByRole",(req:Request,res:Response)=>{
  getUserByRole("Admin")
    .then((response)=> sendResponse(res,200,true,null,response))
    .catch((err:Error)=>sendResponse(res,400,false,err.message,null))
})

export default routerInternalApi;
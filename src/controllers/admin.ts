import {updateUserRole,getUser, enableDisableUser, recentUser} from "../services/adminServices"
import {Request, Response} from "express"
import {sendResponse} from "../helper/helper"
import {Router} from "express"
import { totalUser, activeUser, inactiveUser} from "../services/adminServices"
import { getAllRole, createRole, getRoleByName, updateRole, deleteRole } from "../services/adminServices";
import { createRoleValidation, updateRoleValidation } from "../middlewares/roleValidation"
import { getRoleById } from "../services/adminServices";
const adminRouter: Router = Router()

//update role of employee by admin -- joi validation
adminRouter.put("/userrole", (req: Request, res: Response) =>  {
  updateUserRole(req.body.email, req.body.role)
    .then((response) => sendResponse(res, 200, true, null,response))
    .catch(err => sendResponse(res, 400, false, err.message,null))
})

// get employee --admin
adminRouter.get("/users", (req: Request, res: Response) =>  {
  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  getUser(req.query.searchTerm as string, page as number, limit as number)
    .then(response => sendResponse(res, 200, true, null, response))
    .catch(err => sendResponse(res, 400, false, err.message, null))
})

//block-unblock employee 
adminRouter.put("/user-enable-disable",(req: Request, res: Response) =>  {
  enableDisableUser(req.body.email as string, req.body.status as boolean)
    .then((response) => sendResponse(res, 200, true, null, response))
    .catch(err => sendResponse(res, 400, false, err.message, null))
})


// 5 recent employee -- admin
adminRouter.get("/recentusers", (req: Request, res: Response) =>  {
  recentUser()
    .then(response => sendResponse(res, 200, true, null, response))
    .catch(err => sendResponse(res, 400, false, err.message, null))
})

//give total users
adminRouter.get("/totalusers", (req, res) => {
  totalUser()
      .then(response => sendResponse(res, 200, true, null, response))
      .catch(err => sendResponse(res, 400, false, err.message, null))
})

//give active users
adminRouter.get("/activeusers", (req, res) => {
  activeUser()
      .then(response => sendResponse(res, 200, true, null, response))
      .catch(err => sendResponse(res, 400, false, err.message, null))
})

//give inactive users
adminRouter.get("/inactiveusers", (req, res) => {
  inactiveUser()
      .then(response => sendResponse(res, 200, true, null, response))
      .catch(err => sendResponse(res, 400, false, err.message, null))
})

//role

adminRouter.get("/getallrole", (req:Request, res:Response) => {
  getAllRole()
    .then((result) => sendResponse(res, 200, true,null,result))
    .catch((err) => sendResponse(res, 400, false, err.message,null));
});

adminRouter.post("/createrole", createRoleValidation, (req: Request, res: Response) => {
  const { name, description, permissions, status } = req.body;
  getRoleByName(name)
    .then((result):any => {
      if (result) {
        return sendResponse(res, 400, false, "role already exists", result);
      }
      else{
        return createRole(name, description, permissions, status)
      }
    })
    .then((result) => {
      sendResponse(res, 200, true, null, result);
    })
    .catch((err: Error) => {
      sendResponse(res, 400, false, err.message, null);
    });
});

adminRouter.get("/getrolebyname", (req:Request, res:Response) => {
  const { name } = req.body;
  getRoleByName(name)
    .then((result) => {
      sendResponse(res, 200, true, null,result);
    })
    .catch((err:Error) => {
      sendResponse(res, 400, false,err.message,null);
    });
});

adminRouter.put("/updaterole",updateRoleValidation, (req:Request, res:Response) => {
  const {name, description, permissions, status} = req.body;
  updateRole(name, description, permissions, status)
    .then((result) => {
      sendResponse(res, 200, true, null,result);
    })
    .catch((err) => {
      sendResponse(res, 400, false,err.message,null);
    });
});

adminRouter.delete("/deleterole", (req:Request, res:Response) => {
  const { name } = req.body;
  deleteRole(name)
    .then((result) => {
      sendResponse(res, 200, true, null,result);
    })
    .catch((err) => {
      sendResponse(res, 400, false,err.message,null);
    });
});

adminRouter.get("/getrolebyid",(req:Request,res:Response)=>{
  const id=req.query.id as string;
  getRoleById(id)
    .then((result) => sendResponse(res, 200, true, null, result))
    .catch((err) => sendResponse(res, 400, false, err.message, null));
});

export default adminRouter




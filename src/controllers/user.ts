import { Request, Response } from "express"
import { sendResponse } from "../helper/helper"
import { Router } from "express"
import { getUserById, updateUser, userIsLogin } from "../services/userServices"
import { userProfileValidation } from "../middlewares/userValidation"
const userRouter: Router = Router()

//employee profile
userRouter.get("/profile",(req: Request, res: Response) =>  {
  getUserById(req.headers.userId as string)
    .then(response => sendResponse(res, 200, true, null, response))
    .catch(err => sendResponse(res, 400, false, err.message, null))
})

//logout employee 
userRouter.put("/logout", (req: Request, res: Response) =>  {
  userIsLogin(req.headers.userId as string, false)
  .then(response => sendResponse(res, 200, true, null, response))
  .catch(err => sendResponse(res, 400, false, err.message, null))
})

//update user profile (time, phone, theme) -- joi validation
userRouter.put("/profile-update", userProfileValidation ,(req: any, res: Response) =>  {
  const updatedData = {
    time: req.body.time,
    phone: req.body.phone,
    theme: req.body.theme
  }
  updateUser(req.headers.userId as string ,updatedData)
    .then(response => sendResponse(res, 200, true, null, response))
    .catch(err => sendResponse(res, 400, false, err.message, null))
})

export default userRouter;







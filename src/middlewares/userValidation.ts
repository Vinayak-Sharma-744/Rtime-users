import { NextFunction, Request, Response } from "express";
import joi from "joi"
import { sendResponse } from "../helper/helper";

export const userProfileValidation = (req: Request, res: Response, next: NextFunction) => {
    const schema = joi.object({
        phone: joi.string(),
        time: joi.string(),
        theme: joi.boolean()
    }).unknown(false);
const { error } = schema.validate(req.body, { abortEarly: false });
if (error) {
    return sendResponse(res, 400, false, error.message, null);
}else  {
    next();
}
}

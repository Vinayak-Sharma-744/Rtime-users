import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { sendResponse } from "../helper/helper";

export const createRoleValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    permissions: Joi.array(),
    status: Joi.string()
  });
  const { error } = schema.validate((req as any).body, { abortEarly: false });
  if (error) {
    sendResponse(res, 400, false, error.message, null);
  } else {
    next();
  }
};

export const updateRoleValidation = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object().keys({
    name: Joi.string(),
    description: Joi.string(),
    permissions: Joi.array(),
    status: Joi.string()
  });
  const { error } = schema.validate((req as any).body, { abortEarly: false });
  if (error) {
    sendResponse(res, 400, false, error.message, null);
  } else {
    next();
  }
};
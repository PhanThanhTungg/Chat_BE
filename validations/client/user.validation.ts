import { NextFunction, Request, Response } from "express";

export const registerValidation = (req: Request, res: Response, next:NextFunction):ReturnType<any>=> {
  if(!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if(!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }
  if(!req.body.repassword) {
    return res.status(400).json({ message: "Repassword is required" });
  }
  if(req.body.password !== req.body.repassword) {
    return res.status(400).json({ message: "Password and repassword do not match" });
  }
  if(!req.body.phone) {
    return res.status(400).json({ message: "Phone is required" });
  }
  if(!req.body.fullName) {
    return res.status(400).json({ message: "Full name is required" });
  }

  next();
}
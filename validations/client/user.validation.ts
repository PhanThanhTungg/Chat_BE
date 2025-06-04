import { NextFunction, Request, Response } from "express";
import User from "../../models/user.model";

export const registerValidation = async (req: Request, res: Response, next:NextFunction):Promise<any>=> {
  console.log("validating register...")

  if(!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }
  const checkEmail = await User.findOne({ where: { email: req.body.email } });
  if(checkEmail) {
    return res.status(400).json({ message: "Email already exists" });
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
  const checkPhone = await User.findOne({ where: { phone: req.body.phone } });
  if(checkPhone) {
    return res.status(400).json({ message: "Phone already exists" });
  }
  
  if(!req.body.fullName) {
    return res.status(400).json({ message: "Full name is required" });
  }
  console.log("validating register... done")
  next();
}

export const loginValidation = async(req: Request, res: Response, next:NextFunction):Promise<any>=> {
  if(!req.body.email) {
    return res.status(400).json({ message: "Email is required" });
  }
  if(!req.body.password) {
    return res.status(400).json({ message: "Password is required" });
  }
  next();
}
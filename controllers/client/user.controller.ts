import { Request, Response } from "express";
import  User  from "../../models/user.model";

export const register = async(req: Request, res: Response): Promise<any> => {
  const {email, password, phone, fullName} = req.body;
  try {
    const newUser = await User.create({email, password, phone, fullName});
    return res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error: error });
  }
}

  
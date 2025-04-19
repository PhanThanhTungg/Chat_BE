import { Request, Response } from "express"

export const register = async(req: Request, res: Response): Promise<void> => {
  res.status(200).json({ message: "User registered successfully" });
}
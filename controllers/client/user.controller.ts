import { Request, Response } from "express";
import User from "../../models/user.model";
import { genAccessToken, genRefreshToken } from "../../helpers/genJWTToken.helper";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { email, password, phone, fullName } = req.body;
  try {
    const newUser = await User.create(
      {
        email, password, phone, fullName
      }
    );

    const accessToken = genAccessToken(newUser["id"]);
    const refreshToken = genRefreshToken(newUser["id"]);
    newUser["refreshToken"] = refreshToken;
    await newUser.save();

    return res.status(201).json({ 
      message: "User registered successfully", 
      user:{
        fullName: newUser["fullName"],
        accessToken, refreshToken
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error: error });
  }
}


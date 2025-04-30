import { Request, Response } from "express";
import User from "../../models/user.model";
import { genAccessToken, genRefreshToken } from "../../helpers/genJWTToken.helper";
import { saveCookie } from "../../helpers/httpOnly.helper";
import brcypt from "bcrypt";

export const register = async (req: Request, res: Response): Promise<any> => {
  console.log("Registering user...");
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

    saveCookie(res, "refreshToken", refreshToken);

    return res.status(201).json({ 
      message: "User registered successfully", 
      user:{
        fullName: newUser["fullName"],
        accessToken
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error: error });
  }
}


export const login = async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const matchPassword = await brcypt.compare(password, user["password"]);

    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const accessToken = genAccessToken(user["id"]);
    const refreshToken = genRefreshToken(user["id"]);
    user["refreshToken"] = refreshToken;
    await user.save();

    return res.status(200).json({ 
      message: "User logged in successfully", 
      user:{
        fullName: user["fullName"],
        accessToken
      }
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error", error: error });
  }
}


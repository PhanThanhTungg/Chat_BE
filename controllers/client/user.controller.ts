import { Request, Response } from "express";
import User from "../../models/user.model";
import { genAccessToken, genRefreshToken, verifyToken } from "../../helpers/jwtToken.helper";
import { saveCookie } from "../../helpers/httpOnly.helper";
import brcypt from "bcrypt";
import * as type from "../../types/client/auth.type";
import { ErrorResponse } from "../../types/client/response.type";

export const register = async (req: Request, res: Response): Promise<any> => {
  console.log("Registering user...");

  const { email, password, phone, fullName }: type.RegisterInput = req.body;
  try {
    // create new user
    const newUser = await User.create(
      {
        email, password, phone, fullName
      }
    );

    // create tokens
    const accessToken:string = genAccessToken(newUser["id"]);
    const refreshToken:string = genRefreshToken(newUser["id"]);

    await newUser.save();

    saveCookie(res, "refreshToken", refreshToken);

    const respone:type.SuccessAuthResponse = {
      message: "User registered successfully",
      accessToken,
      user: {
        fullName: newUser["fullName"],
        email: newUser["email"],
        phone: newUser["phone"],
        avatar: newUser["avatar"],
      }
    }
    return res.status(201).json(respone);

  } catch (error) {
    console.log(error);
    const respone:ErrorResponse = {
      message: "Error registering user",
      error: error
    }
    return res.status(500).json(respone);
  }
}

export const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { email, password }: type.LoginInput = req.body;

    // find user in database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    // check password
    const matchPassword: boolean = await brcypt.compare(password, user["password"]);
    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // create tokens
    const accessToken:string = genAccessToken(user["id"]);
    const refreshToken:string = genRefreshToken(user["id"]);

    saveCookie(res, "refreshToken", refreshToken);

    const response:type.SuccessAuthResponse = {
      message: "User logged in successfully",
      accessToken,
      user: {
        fullName: user["fullName"],
        email: user["email"],
        phone: user["phone"],
        avatar: user["avatar"],
      }
    };
    return res.status(200).json(response);

  } catch (error) {
    console.log(error);
    const response:ErrorResponse = {
      message: "Internal server error",
      error: error
    };
    return res.status(500).json(response);
  }
}

export const logout = async (req: Request, res: Response): Promise<any> => {
  try {
    // clear cookie
    res.clearCookie("refreshToken");

    const response:type.SuccessLogoutResponse = {
      message: "User logged out successfully"
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    const response:ErrorResponse = {
      message: "Internal server error",
      error: error
    };
    return res.status(500).json(response);
  }
}

export const refreshToken = async (req: Request, res: Response): Promise<any> => {
  try {
    const refreshToken:string = req.cookies["refreshToken"];
    
    // check refresh token
    if (!refreshToken) {
      const response:ErrorResponse = {
        message: "No refresh token provided",
        error: "Unauthorized"
      };
      return res.status(401).json(response);
    }

    // verify refresh token
    const refreshTokenDecoded = verifyToken(refreshToken, "refresh");
    if (!refreshTokenDecoded) {
      const response:ErrorResponse = {
        message: "Invalid refresh token",
        error: "Forbidden"
      };
      return res.status(403).json(response);
    }
    if(refreshTokenDecoded.expired == true){
      const response:ErrorResponse = {
        message: "Refresh token expired",
        error: "Forbidden"
      };
      return res.status(403).json(response);
    }
    const userId:string = refreshTokenDecoded["id"];

    // check userId
    if (!userId) {
      const response:ErrorResponse = {
        message: "Invalid refresh token",
        error: "Forbidden"
      };
      return res.status(403).json(response);
    }

    // find user in database
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      const response:ErrorResponse = {
        message: "User not found",
        error: "Not Found"
      };
      return res.status(404).json(response);
    }

    // create new tokens
    const newRefreshToken = genRefreshToken(userId);
    saveCookie(res, "refreshToken", newRefreshToken);
    const newAccessToken = genAccessToken(userId);

    // respond
    const response:type.SuccessAuthResponse = {
      message: "Access token refreshed successfully",
      accessToken: newAccessToken
    };
    return res.status(200).json(response);

  } catch (error) {
    console.log(error);
    const response:ErrorResponse = {
      message: "Internal server error",
      error: error
    };
    return res.status(500).json(response);
  }
}


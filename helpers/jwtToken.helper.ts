import jwt from "jsonwebtoken";
import { tokenDecoded } from "../types/client/auth.type";

export const genAccessToken = (id:string):string =>{
  const accessToken:string = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRE})
  return accessToken;
}

export const genRefreshToken = (id:string):string =>{
  const refreshToken:string = jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRE})
  return refreshToken;
}

export const verifyToken = (token:string, type:string):tokenDecoded => {
  try {
    const secretKey:string = type === "access" ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET; 
    const decoded:tokenDecoded = jwt.verify(token, secretKey);
    if (decoded.exp && decoded.exp < Date.now() / 1000) {
      decoded.expired = true;
    } else {
      decoded.expired = false;
    }
    return decoded;
  } catch (error) {
    if(error instanceof jwt.TokenExpiredError) {
      return { expired: true } as tokenDecoded;
    }
    else return null;
  }
}

import jwt from "jsonwebtoken";

export const genAccessToken = (id:string):string =>{
  const accessToken = jwt.sign({id}, process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_SECRET_EXPIRE})
  return accessToken;
}

export const genRefreshToken = (id:string):string =>{
  const refreshToken = jwt.sign({id}, process.env.REFRESH_TOKEN_SECRET,{expiresIn: process.env.REFRESH_TOKEN_SECRET_EXPIRE})
  return refreshToken;
}

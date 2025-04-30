export const saveCookie = (res:any, type:string, token:string):void => {
  res.cookie(type, token, {
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  });
}
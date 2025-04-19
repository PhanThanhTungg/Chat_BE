import { Express } from "express";
import userRoute from "./user.route";
export default (app: Express) => {
  app.use("/user", userRoute);
}
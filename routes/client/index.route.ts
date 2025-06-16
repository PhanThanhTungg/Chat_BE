import { Express } from "express";
import userRoute from "./user.route";
import friendRoute from "./friend.route";
import {authAccessToken} from "../../middlewares/client/auth.middleware";

export default (app: Express) => {
  app.use("/user", userRoute);
  app.use("/friend", authAccessToken, friendRoute);
}
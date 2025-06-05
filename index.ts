import express from 'express';
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
app.use(cors(
  {
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  }
));

import connectMysql from './config/connect';
connectMysql;

import bodyParser from 'body-parser';
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

import cookieParser from 'cookie-parser';
app.use(cookieParser());

import clientRoute from './routes/client/index.route';
clientRoute(app);

const port:number = parseInt(process.env.PORT+"") || 3000;
app.listen(port, ()=>{
  console.log("Server is running on port " + port);
})
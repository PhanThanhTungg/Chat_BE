import express from 'express';
const app = express();

import dotenv from "dotenv";
dotenv.config();

import cors from 'cors';
app.use(cors());

import connectMysql from './config/connect';
connectMysql;

import clientRoute from './routes/client/index.route';
clientRoute(app);

const port:number = parseInt(process.env.PORT+"") || 3000;
app.listen(port, ()=>{
  console.log("Server is running on port " + port);
})
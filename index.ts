import express from 'express';
const app = express();

import dotenv from "dotenv";
dotenv.config();

app.get("/", (req,res)=>{
  res.send("Hello World!")
})

const port:number = parseInt(process.env.PORT+"") || 3000;
app.listen(port, ()=>{
  console.log("Server is running on port " + port);
})
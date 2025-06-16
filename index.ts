import express from 'express';
const app = express();

// dotenv setup
import dotenv from "dotenv";
dotenv.config();

// cors Object initialization
const corsOrigin:string | boolean = process.env.CORS_ORIGIN == "true" ? true : process.env.CORS_ORIGIN;
const corsObject = {
  origin: corsOrigin,
  credentials: true
}

// socket.io setup
import { createServer } from 'node:http';
import { Server } from 'socket.io';
const server = createServer(app);
const io = new Server(server,{
  cors: corsObject,
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.handshake.headers.cookie);
});

global._io = io;

// configure cors
import cors from 'cors';
app.use(cors(corsObject));

// connect to MySQL database
import connectMysql from './config/connect';
connectMysql;

// body parser setup
import bodyParser from 'body-parser';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// cookie parser setup
import cookieParser from 'cookie-parser';
app.use(cookieParser());

// client-routes setup
import clientRoute from './routes/client/index.route';
clientRoute(app);

const port:number = parseInt(process.env.PORT+"") || 3000;
server.listen(port, ()=>{
  console.log("Server is running on port " + port);
})
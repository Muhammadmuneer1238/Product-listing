import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Productrouter from "./routes/product.routes.js";
import Catroute from "./routes/category.routes.js";
import cors  from "cors";
import bodyParser from "body-parser";
import { error } from "console";
import http from 'http'
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to the database");
}).catch(() => {
    console.log("Connection error",error);
})

const app = express();
const server=http.createServer(app)
app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://frontend-client-jspfkt790-muhammadmuneer1238s-projects.vercel.app',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
server.listen(3000, () => {
    console.log("Server connected to the port");
});
app.use(express.json())
app.use('/server/product',Productrouter)
app.use('/server/category',Catroute)

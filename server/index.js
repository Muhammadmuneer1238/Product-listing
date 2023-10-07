import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Productrouter from "./routes/product.routes.js";
import Catroute from "./routes/category.routes.js";
import cors  from "cors";
import bodyParser from "body-parser";
dotenv.config();

mongoose.connect(process.env.MONGO).then(() => {
    console.log("Connected to the database");
}).catch(() => {
    console.log("Connection error");
})

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
};

app.use(cors(corsOptions));
app.listen(3000, () => {
    console.log("Server connected to the port");
});
app.use(express.json())
app.use('/server/product',Productrouter)
app.use('/server/category',Catroute)

import express from "express"
import { categoryController } from "../controller/catController.js";
const router = express.Router();

router.post('/category', categoryController)

export default router;
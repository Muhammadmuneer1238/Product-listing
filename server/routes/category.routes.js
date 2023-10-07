import express from "express"
import { categoryController,fetchCategory } from "../controller/catController.js";
const router = express.Router();

router.post('/category', categoryController)
router.get('/cat',fetchCategory)

export default router;
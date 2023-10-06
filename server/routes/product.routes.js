import express from "express"
import { test} from "../controller/productController.js";
const router = express.Router();
router.get('/add',test)
export default router
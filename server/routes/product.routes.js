import express from "express"
import { test, addProduct ,productList} from "../controller/productController.js";
const router = express.Router();
router.get('/add', test)
router.post('/addProduct', addProduct)
router.get('/products',productList)
export default router;
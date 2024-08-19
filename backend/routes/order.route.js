import express from "express"
import { getAllOrders, getOrder, getUniqueArea, order } from "../controllers/order.controller.js";
const router=express.Router();

router.post("/neworder",order);
router.get("/getallorders",getAllOrders);
router.get("/getorder/:id",getOrder);
router.get("/getuniqueareas",getUniqueArea);
export default router;



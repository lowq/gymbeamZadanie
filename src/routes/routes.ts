import express, { Request, Response, NextFunction } from "express";
import warehouseController from "../controllers/warehouse.controller";
const router = express.Router();

router.post("/quickestPath", warehouseController.getQuickestPath);

export default router;

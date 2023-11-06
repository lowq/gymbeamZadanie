import { NextFunction, Request, Response } from "express";
import { validateQuickestPathBody } from "../utils/validationForWarehouse";
import warehouseService from "../services/warehouse.service";

const getQuickestPath = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const validation = validateQuickestPathBody(req.body);
    if (validation.error) {
      res.status(400).json(validation.error.details[0].message);
    }
    res
      .status(200)
      .json(
        await warehouseService.getQuickestPath(
          validation.value.products,
          validation.value.startingPosition
        )
      );
  } catch (err: any) {
    res.status(500).json("Error " + err);
  }
};

export default {
  getQuickestPath,
};

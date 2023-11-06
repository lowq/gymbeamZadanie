import { Position } from "../models/werahouse.model";
import {
  findShortestRoute,
  getPositions,
} from "../utils/warehouse/warehouse.utils";

const getQuickestPath = async (
  products: string[],
  startingPosition: { x: number; y: number; z: number }
) => {
  try {
    const positions = await getPositions(products);
    const productsLength = products.length;
    const startingPositionLocal: Position = {
      positionId: "",
      productId: "",
      quantity: 0,
      x: startingPosition.x,
      y: startingPosition.y,
      z: startingPosition.z,
    };

    const { route, distance } = findShortestRoute(
      productsLength,
      positions,
      startingPositionLocal
    );

    const pickingOrder = route.map((product: Position) => {
      return { productId: product.productId, positionId: product.positionId };
    });

    return {
      pickingOrder,
      distance,
    };
  } catch (error) {
    throw error;
  }
};

export default {
  getQuickestPath,
};

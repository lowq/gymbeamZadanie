import axios, { AxiosError } from "axios";
import { CalculatedPosition, Position } from "../models/werahouse.model";
import { calculateDistance } from "../utils/calculateDistance";

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

const findShortestRoute = (
  productsLength: number,
  allPositions: Position[],
  startingCoordinates: Position
) => {
  let calculatedDistance = 0;

  const shortestRoute: Position[] = [];

  const firstCalculatedPosition = findShortestPositions(
    allPositions,
    startingCoordinates
  );

  calculatedDistance += firstCalculatedPosition
    ? firstCalculatedPosition?.distance
    : 0;

  let firstPosition = allPositions.find(
    (position) =>
      position.positionId === firstCalculatedPosition?.positionId &&
      position.productId === firstCalculatedPosition.productId
  );

  firstPosition && shortestRoute.push(firstPosition);

  allPositions = allPositions.filter(
    (position) => position.productId !== firstCalculatedPosition?.productId
  );

  for (let i = 0; i < productsLength - 1; i++) {
    const calculatedPosition = findShortestPositions(
      allPositions,
      firstPosition ? firstPosition : ({} as Position)
    );

    calculatedDistance += calculatedPosition ? calculatedPosition?.distance : 0;

    firstPosition = allPositions.find(
      (position) =>
        position.positionId === calculatedPosition?.positionId &&
        position.productId === calculatedPosition?.productId
    );

    firstPosition && shortestRoute.push(firstPosition);

    allPositions = allPositions.filter(
      (position) => position.productId !== calculatedPosition?.productId
    );
  }

  return { route: shortestRoute, distance: calculatedDistance };
};

const findShortestPositions = (
  positions: Position[],
  startingCoordinates: Position
): CalculatedPosition | null => {
  const calculatedPositions: CalculatedPosition[] = [];
  for (let i = 0; i < positions.length; i++) {
    const distance = calculateDistance(
      startingCoordinates.x,
      startingCoordinates.y,
      startingCoordinates.z,
      positions[i].x,
      positions[i].y,
      positions[i].z
    );
    calculatedPositions.push({
      distance: distance,
      positionId: positions[i].positionId,
      productId: positions[i].productId,
    });
  }

  let lowestDistance = Infinity;
  let lowestDistancePosition: CalculatedPosition | null = null;

  for (const position of calculatedPositions) {
    if (position.distance < lowestDistance) {
      lowestDistance = position.distance;
      lowestDistancePosition = position;
    }
  }

  return lowestDistancePosition;
};

const getPositions = async (products: string[]): Promise<Position[]> => {
  const fullProducts: Position[] = [];
  for (let index = 0; index < products.length; index++) {
    const apiURL = `https://dev.aux.boxpi.com/case-study/products/${products[index]}/positions`;
    const response = await axios.get<Position[]>(apiURL, {
      headers: {
        "x-api-key": "MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z",
      },
    });

    fullProducts.push(...response.data);
  }

  return fullProducts;
};

export default {
  getQuickestPath,
};

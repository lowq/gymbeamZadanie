import axios from "axios";
import { CalculatedPosition, Position } from "../../models/werahouse.model";
import { calculateDistance } from "./calculateDistance";

//
/**
 * Finding shortest route in array where are positions when one route is used others route with same productId will be ignore
 * @param {number} productsLength - The total number of products to visit.
 * @param {Position[]} allPositions - An array of all available positions to visit.
 * @param {Position} startingCoordinates - The starting position for the route.
 * @returns {void} This function modifies internal variables and does not return a value.
 */
export const findShortestRoute = (
  productsLength: number,
  allPositions: Position[],
  startingCoordinates: Position
) => {
  let calculatedDistance = 0;

  const shortestRoute: Position[] = [];

  // Find the first calculated position with the shortest distance from the starting coordinates
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

  // Iterate to find the shortest route by repeating the process for the remaining products
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

//
/**
 * Finding shortest position from starting coordinates and returning that Position and distance
 * @param {Position[]} positions - An array of positions to consider.
 * @param {Position} startingCoordinates - The starting position for distance calculation.
 * @returns {CalculatedPosition | null} The position with the shortest distance or null if positions array is empty.
 */
const findShortestPositions = (
  positions: Position[],
  startingCoordinates: Position
): CalculatedPosition | null => {
  // Create an array to store calculated positions with distances
  const calculatedPositions: CalculatedPosition[] = [];

  // Calculate distances from the starting position to each position in the array

  for (let i = 0; i < positions.length; i++) {
    const distance = calculateDistance(
      startingCoordinates.x,
      startingCoordinates.y,
      startingCoordinates.z,
      positions[i].x,
      positions[i].y,
      positions[i].z
    );
    // Store the calculated position with its distance, positionId, and productId

    calculatedPositions.push({
      distance: distance,
      positionId: positions[i].positionId,
      productId: positions[i].productId,
    });
  }

  // Initialize variables to find the position with the lowest distance
  let lowestDistance = Infinity;
  let lowestDistancePosition: CalculatedPosition | null = null;

  // Iterate through calculated positions to find the one with the lowest distance
  for (const position of calculatedPositions) {
    if (position.distance < lowestDistance) {
      lowestDistance = position.distance;
      lowestDistancePosition = position;
    }
  }

  return lowestDistancePosition;
};

//
/**
 * Using external API to get that array of positions for every product in string array
 * @param products
 * @returns
 */
export const getPositions = async (products: string[]): Promise<Position[]> => {
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

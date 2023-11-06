/* import axios from "axios";

interface Product {
  name: string;
  positions: Position[];
}



const findShortestRoutev1 = (
  products: Product[],
  startingCoordinates: Position
) => {};

const findShortestRoute = (
  products: Product[],
  startingCoordinates: Position
) => {
  let calculatedDistance = 0;
  let allPositions = products
    .map((product) => product.positions)
    .reduce((acc, arr) => acc.concat(arr), []);

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

  for (let i = 0; i < products.length - 1; i++) {
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







const index = async () => {
  const products = await getProducts([
    "product-1",
    "product-2",
    "product-3",
    "product-4",
    "product-5",
    "product-6",
    "product-7",
    "product-8",
    "product-9",
    "product-10",
    "product-11",
    "product-12",
    "product-13",
  ]);
  const { route, distance } = findShortestRoute(products, startingCoordinates);
  console.log("Nejkratšia cesta:", route);
  console.log("Celková vzdialenost:", distance);
};

// Použití algoritmu
const startingCoordinates: Position = {
  positionId: "start",
  productId: "start",
  quantity: 0,
  x: 0,
  y: 0,
  z: 0,
}; // Počáteční pozice

index();
 */

import axios from "axios"

interface Product {
  name: string;
  positions: Position[];
}

interface Position {
  positionId: string;
  x: number;
  y: number;
  z: number;
  productId: string;
  quantity: number;
}

interface CalculatedPosition {
  positionId: string;
  productId: string;
  distance: number;
}

const findShortestRoutev1 = (
  products: Product[],
  startingCoordinates: Position
) => {

}

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
        position.positionId === calculatedPosition.positionId &&
        position.productId === calculatedPosition.productId
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

const calculateDistance = (
  x1: number,
  y1: number,
  z1: number,
  x2: number,
  y2: number,
  z2: number
) => {
  const deltaX = x2 - x1;
  const deltaY = y2 - y1;
  const deltaZ = z2 - z1;

  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2 + deltaZ ** 2);

  return distance;
};


const getProducts = async (products: string[]): Promise<Product[]> => {
  const fullProducts: Product[] = []
  for (let index = 0; index < products.length; index++) {
    let positions: Position[]
    const apiURL = `https://dev.aux.boxpi.com/case-study/products/${products[index]}/positions`
    const response = await axios.get(apiURL, {
      headers: {
        'x-api-key': 'MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z'
      }
    })
    if (response.status === 200) {
      positions = response.data
    } else {
      console.log("problem"
        + response.status + response.statusText);
      return
    }
    const cretedProduct: Product = { name: products[index], positions: positions }
    fullProducts.push(cretedProduct)
  }



  return fullProducts
}

const index = async () => {
  const products = await getProducts(["product-1", "product-2", "product-3", "product-4", "product-5", "product-6", "product-7", "product-8", "product-9", "product-10", "product-11", "product-12", "product-13"])
  const { route, distance } = findShortestRoute(products, startingCoordinates);
  console.log("Nejkratší cesta:", route);
  console.log("Celková vzdálenost:", distance);
}

// Použití algoritmu
const startingCoordinates: Position = {
  positionId: "start",
  productId: "start",
  quantity: 0,
  x: 0,
  y: 0,
  z: 0,
}; // Počáteční pozice

index()
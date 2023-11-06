"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var findShortestRoute = function (products, startingCoordinates) {
    var calculatedDistance = 0;
    var allPositions = products
        .map(function (product) { return product.positions; })
        .reduce(function (acc, arr) { return acc.concat(arr); }, []);
    var shortestRoute = [];
    var firstCalculatedPosition = findShortestPositions(allPositions, startingCoordinates);
    calculatedDistance += firstCalculatedPosition
        ? firstCalculatedPosition === null || firstCalculatedPosition === void 0 ? void 0 : firstCalculatedPosition.distance
        : 0;
    var firstPosition = allPositions.find(function (position) {
        return position.positionId === (firstCalculatedPosition === null || firstCalculatedPosition === void 0 ? void 0 : firstCalculatedPosition.positionId) &&
            position.productId === firstCalculatedPosition.productId;
    });
    firstPosition && shortestRoute.push(firstPosition);
    allPositions = allPositions.filter(function (position) { return position.productId !== (firstCalculatedPosition === null || firstCalculatedPosition === void 0 ? void 0 : firstCalculatedPosition.productId); });
    var _loop_1 = function (i) {
        var calculatedPosition = findShortestPositions(allPositions, firstPosition ? firstPosition : {});
        calculatedDistance += calculatedPosition ? calculatedPosition === null || calculatedPosition === void 0 ? void 0 : calculatedPosition.distance : 0;
        firstPosition = allPositions.find(function (position) {
            return position.positionId === calculatedPosition.positionId &&
                position.productId === calculatedPosition.productId;
        });
        firstPosition && shortestRoute.push(firstPosition);
        allPositions = allPositions.filter(function (position) { return position.productId !== (calculatedPosition === null || calculatedPosition === void 0 ? void 0 : calculatedPosition.productId); });
    };
    for (var i = 0; i < products.length - 1; i++) {
        _loop_1(i);
    }
    return { route: shortestRoute, distance: calculatedDistance };
};
var findShortestPositions = function (positions, startingCoordinates) {
    var calculatedPositions = [];
    for (var i = 0; i < positions.length; i++) {
        var distance_1 = calculateDistance(startingCoordinates.x, startingCoordinates.y, startingCoordinates.z, positions[i].x, positions[i].y, positions[i].z);
        calculatedPositions.push({
            distance: distance_1,
            positionId: positions[i].positionId,
            productId: positions[i].productId,
        });
    }
    var lowestDistance = Infinity;
    var lowestDistancePosition = null;
    for (var _i = 0, calculatedPositions_1 = calculatedPositions; _i < calculatedPositions_1.length; _i++) {
        var position = calculatedPositions_1[_i];
        if (position.distance < lowestDistance) {
            lowestDistance = position.distance;
            lowestDistancePosition = position;
        }
    }
    return lowestDistancePosition;
};
var calculateDistance = function (x1, y1, z1, x2, y2, z2) {
    var deltaX = x2 - x1;
    var deltaY = y2 - y1;
    var deltaZ = z2 - z1;
    var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2) + Math.pow(deltaZ, 2));
    return distance;
};
var getProducts = function (products) {
    var fullProducts = [];
    var _loop_2 = function (index) {
        var positions;
        var apiURL = "https://dev.aux.boxpi.com/case-study/products/".concat(products[index], "/positions");
        axios_1.default.get(apiURL, {
            headers: {
                'x-api-key': 'MVGBMS0VQI555bTery9qJ91BfUpi53N24SkKMf9Z'
            }
        }).then(function (res) { return positions = res.data; }).catch(function (err) { return console.log(err); });
        var cretedProduct = { name: products[index], positions: positions };
        fullProducts.push(cretedProduct);
    };
    for (var index = 0; index < products.length; index++) {
        _loop_2(index);
    }
    return fullProducts;
};
// Použití algoritmu
var startingCoordinates = {
    positionId: "start",
    productId: "start",
    quantity: 0,
    x: 0,
    y: 0,
    z: 0,
}; // Počáteční pozice
var _a = findShortestRoute(getProducts(["product-1", "product-2", "product-3", "product-4", "product-5"]), startingCoordinates), route = _a.route, distance = _a.distance;
console.log("Nejkratší cesta:", route);
console.log("Celková vzdálenost:", distance);
//# sourceMappingURL=skuska.js.map
# Gymbeam assignment README

## Introduction

This HTTP server is designed to provide a specific API endpoint to calculate the quickest path for picking products in a warehouse. The server runs on port 3000 and exposes a single API endpoint "/quickestPath".

## API Endpoint: "/quickestPath"

This API calculates the quickest path for picking a list of products in a warehouse. It takes a JSON request with a list of products and a starting position and returns the picking order and distance.

### Request

- **HTTP Method**: POST
- **URL**: http://localhost:3000/quickestPath
- **Request Body**:
  ```json
  {
      "products": [
          "product-1",
          "product-2",
          "product-3",
          "product-4",
          "product-5",
          "product-6",
          "product-7"
      ],
      "startingPosition": {
          "x": 0,
          "y": 0,
          "z": 0
      }
  }
  ```

Products must be a specific array with only a string and inside there must be only "product-" with some number, everything is validated.

### Response

The API response will be in JSON format and will include the picking order and distance.

- **Response Body**:
  ```json
  {
      "pickingOrder": [
          {
              "productId": "product-2",
              "positionId": "position-123"
          },
          {
              "productId": "product-1",
              "positionId": "position-55"
          },
          ...
      ],
      "distance": 512
  }
  ```

- **Response Status Codes**:
  - 200 OK: The request was successful, and the response contains the calculated picking order and distance.
  - 400 Bad Request: If the request is malformed or missing required fields.
  - 500 Internal Server Error: Some error inside the code.

## Getting Started

1. Clone the repository.
2. Install the required dependencies.
   ```shell
   npm i
   ```
3. Start the server using the following command:
   ```shell
   npm run start-server
   ```

## Dependencies

This server is built using Node.js and may have additional dependencies.

    @types/express:
        Description: TypeScript type definitions for Express.js web framework.

    @types/helmet:
        Description: TypeScript type definitions for Helmet, a security middleware for Express.

    axios:
        Description: A promise-based HTTP client for making HTTP requests in JavaScript and Node.js.

    express:
        Description: A fast, minimalist, and flexible web application framework for Node.js.

    helmet:
        Description: Security middleware for Express that sets HTTP headers to enhance application security.

    joi:
        Description: A library for data validation and schema definition in JavaScript.

    nodemon:
        Description: A utility that monitors file changes and automatically restarts your Node.js server during development.

    ts-node:
        Description: An execution environment for running TypeScript files directly in Node.js without the need for compilation.

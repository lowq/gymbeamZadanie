import supertest from "supertest";
import app from "../app";
import { number } from "joi";

interface Output {
  pickingOrder: {
    productId: string;
    positionId: string;
  }[];
  distance: number;
}

describe("Quickest path", () => {
  describe("Test if server running", () => {
    it("Should return 200 with specific json", async () => {
      await supertest(app)
        .get("/")
        .expect(200)
        .expect((res) => res.body === "Server working");
    });
  });
  describe("Get quickest path", () => {
    describe("Bad input", () => {
      it("Should return a 400", async () => {
        const badInput = "Bad";
        await supertest(app)
          .post("/quickestPath")
          .send(JSON.stringify(badInput))
          .expect(400)
          .expect((res) => res.body === '"products" is required');
      });

      return;
    });
    describe("Bad product array", () => {
      it("Should return a 400", async () => {
        const badInput = {
          products: ["product-1", "product-2s"],
          startingPosition: {
            x: 0,
            y: 0,
            z: 0,
          },
        };
        await supertest(app)
          .post("/quickestPath")
          .send(JSON.stringify(badInput))
          .expect(400)
          .expect(
            (res) =>
              res.body ===
              '"products[1]" with value "product-2s" fails to match the required pattern: /^product-(?=\\d+$)/'
          );

        return;
      });
    });
    describe("missing starting position", () => {
      it("Should return a 400", async () => {
        const badInput = {
          products: ["product-1", "product-2"],
        };
        await supertest(app)
          .post("/quickestPath")
          .send(JSON.stringify(badInput))
          .expect(400)
          .expect((res) => res.body === '"startingPosition" is required');

        return;
      });
    });
    describe("Good request", () => {
      it("Should return a 200", async () => {
        const goodInput = {
          products: ["product-1", "product-2"],
          startingPosition: {
            x: 0,
            y: 0,
            z: 0,
          },
        };
        const test = await supertest(app)
          .post("/quickestPath")
          .set("Content-type", "application/json")
          .send(JSON.stringify(goodInput))
          .expect(200)
          .expect((res) =>
            expect(res.body).toEqual(
              expect.objectContaining<Output>({
                pickingOrder: expect.arrayContaining([
                  expect.objectContaining({
                    productId: expect.any(String),
                    positionId: expect.any(String),
                  }),
                ]),
                distance: expect.any(Number),
              })
            )
          );

        return;
      });
    });
  });
});

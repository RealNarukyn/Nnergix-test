import request from "supertest";
import app from "../src/app";
import { DBT } from "./dbt";

const dbt = new DBT();
beforeAll(async () => await dbt.connect());
afterEach(async () => await dbt.clearDb());
afterAll(async () => await dbt.closeDb());

describe("Test ROOT Path", () => {
  test("GET method to /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("POST method to /link", async () => {
    const response = await request(app).post("/link").send({
      url: "https://stackoverflow.com/questions/54315266/jest-how-to-test-express-api-post-request",
    });

    expect(response.statusCode).toBe(200);

    const keys = Object.keys(response.body[0]);
    expect(keys).toContain("text");
    expect(keys).toContain("href");
  });

  test("POST method to /link without url", async () => {
    const response = await request(app).post("/link");

    expect(response.statusCode).toBe(400);
    expect(response.body).toMatchObject({ error: "Invalid url..." });
  });
});

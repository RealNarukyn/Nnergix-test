import request from "supertest";
import app from "../src/app";

describe("Test ROOT Path", () => {
  test("Response to GET method to /", async () => {
    const response = await request(app).get("/");
    expect(response.statusCode).toBe(200);
  });

  test("Response POST method to /link", async () => {
    const response = await request(app).post("/link").send({
      url: "https://stackoverflow.com/questions/54315266/jest-how-to-test-express-api-post-request",
    });

    expect(response.statusCode).toBe(200);

    const keys = Object.keys(response.body[0]);
    expect(keys).toContain("text");
    expect(keys).toContain("href");
  });
});

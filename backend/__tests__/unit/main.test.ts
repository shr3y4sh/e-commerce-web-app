import { it, expect } from "vitest";
import request from "supertest";
import app from "../../src/main.js";

it("should send status 200", async () => {
    const response = await request(app)
        .get("/hello")
        .expect(200)
        .expect("Content-Type", /text/);

    expect(response.text).toStrictEqual("Hello");
});

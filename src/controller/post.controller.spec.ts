import { server } from './../server';
import request from "supertest";

describe("Test PostController", () => {
    it ("should get all posts", async () => {
        const result = await request(server.getApp()).get("/").send();

        expect(result.status).toBe(200);
    });
})
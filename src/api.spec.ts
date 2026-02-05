import { beforeAll, describe, expect, it, vi } from "vitest";
import supertest, { type Response } from "supertest";
import { app, emitTick, io } from "./app.ts";
let response: Response;

describe(`GET /api/status`, () => {
  it("should return expected playload", async () => {
    response = await supertest(app).get(`/api/status`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      currentTick: expect.any(String),
      currentCount: expect.any(Number),
    });
  });
});

describe(`POST /api/poke`, () => {
  it("should return success", async () => {
    response = await supertest(app).post(`/api/poke`);
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ success: true });
  });

  it("should increment the count", async () => {
    response = await supertest(app).get(`/api/status`);
    const n1 = response.body.currentCount ?? -1;
    await supertest(app).post(`/api/poke`);
    response = await supertest(app).get(`/api/status`);
    const n2 = response.body.currentCount ?? -1;
    expect(n2).toBeGreaterThan(n1 as number);
  });
});

describe("emitTick", () => {
  it("should call io.emit", () => {
    const fn = vi.spyOn(io, "emit").mockImplementation(vi.fn());
    emitTick();
    expect(fn).toHaveBeenCalledExactlyOnceWith("tick", {
      time: expect.any(String),
      watchers: expect.any(Number),
    });
  });
});

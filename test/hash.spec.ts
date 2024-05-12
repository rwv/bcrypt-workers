import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
// Could import any other source file/function here
import worker from "../src";

describe("bcrypt", () => {
  it("hash password", async () => {
    const request = new Request("http://example.com/hash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: crypto.randomUUID(),
        rounds: 10,
      }),
    });
    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.result.hash).toBeDefined();
  });

  it("bad request without password", async () => {
    const request = new Request("http://example.com/hash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rounds: 10,
      }),
    });
    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);
    expect(response.status).toBe(400);
  });

  it("hash password with default rounds", async () => {
    const request = new Request("http://example.com/hash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: crypto.randomUUID(),
      }),
    });
    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.result.hash).toBeDefined();
  });

  it("hash password with invalid rounds", async () => {
    const request = new Request("http://example.com/hash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: crypto.randomUUID(),
        rounds: "invalid",
      }),
    });
    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);
    expect(response.status).toBe(400);
  });
});

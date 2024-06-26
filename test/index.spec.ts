import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
// Could import any other source file/function here
import worker from "../src";

describe("bcrypt", () => {
  it("hash and verify password", async () => {
    const password = crypto.randomUUID();

    const request = new Request("http://example.com/hash", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
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

    const request2 = new Request("http://example.com/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        hash: body.result.hash,
      }),
    });

    // Create an empty context to pass to `worker.fetch()`
    const ctx2 = createExecutionContext();
    const response2 = await worker.fetch(request2, env, ctx2);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx2);
    const body2 = await response2.json();
    expect(body2.success).toBe(true);
    expect(body2.result.verified).toBe(true);
  });
});

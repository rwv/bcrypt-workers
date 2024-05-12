import {
  env,
  createExecutionContext,
  waitOnExecutionContext,
} from "cloudflare:test";
import { describe, it, expect } from "vitest";
// Could import any other source file/function here
import worker from "../src";

describe("bcrypt", () => {
  it("verify password", async () => {
    const request = new Request("http://example.com/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: "password",
        hash: "$2a$10$0AeRIW6lLG4Nz5uCLItonuasTNdScKoLzBX9hIzIII371CxBcwYrO",
      }),
    });
    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.result.verified).toBe(true);
  });

  it("verify password wrong", async () => {
    const request = new Request("http://example.com/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: "password",
        hash: "$2a$10$0AeRIW6lLG4Nz5uCLItonuasTNdScKo",
      }),
    });
    // Create an empty context to pass to `worker.fetch()`
    const ctx = createExecutionContext();
    const response = await worker.fetch(request, env, ctx);
    // Wait for all `Promise`s passed to `ctx.waitUntil()` to settle before running test assertions
    await waitOnExecutionContext(ctx);
    const body = await response.json();
    expect(body.success).toBe(true);
    expect(body.result.verified).toBe(false);
  });
});

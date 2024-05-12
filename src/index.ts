import { OpenAPIRouter } from "@cloudflare/itty-router-openapi";
import { Hash } from "endpoints/hash";
import { Verify } from "endpoints/verify";

export const router = OpenAPIRouter({
  docs_url: "/",
});

router.post("/hash", Hash);
router.post("/verify", Verify);

// 404 for everything else
router.all("*", () =>
  Response.json(
    {
      success: false,
      error: "Route not found",
    },
    { status: 404 }
  )
);

export default {
  fetch: router.handle,
};

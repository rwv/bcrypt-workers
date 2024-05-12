import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Password, Hash } from "../types";
import { compareSync } from "bcrypt-edge";

export const VerifyRequest = {
  password: Password,
  hash: Hash,
};

export class Verify extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["bcrypt"],
    summary: "Verify a password",
    requestBody: VerifyRequest,
    responses: {
      "200": {
        description: "Returns whether the password matches the hash",
        schema: {
          success: Boolean,
          result: {
            verified: Boolean,
          },
        },
      },
    },
  };

  async handle(
    request: Request,
    env: any,
    context: any,
    data: Record<string, any>
  ) {
    const { password, hash } = data.body;

    const verified = compareSync(password, hash);

    return {
      success: true,
      result: {
        verified,
      },
    };
  }
}

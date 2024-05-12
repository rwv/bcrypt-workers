import {
  OpenAPIRoute,
  OpenAPIRouteSchema,
} from "@cloudflare/itty-router-openapi";
import { Password, Rounds, Hash as HashResult } from "../types";
import { hashSync } from "bcrypt-edge";

export const HashRequest = {
  password: Password,
  rounds: Rounds,
};

export class Hash extends OpenAPIRoute {
  static schema: OpenAPIRouteSchema = {
    tags: ["bcrypt"],
    summary: "Hash a password",
    requestBody: HashRequest,
    responses: {
      "200": {
        description: "Returns the hashed password",
        schema: {
          success: Boolean,
          result: {
            hash: HashResult,
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
    const { password, rounds } = data.body;

    const hash = hashSync(password, rounds);

    return {
      success: true,
      result: {
        hash,
      },
    };
  }
}

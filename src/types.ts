import { Str, Num } from "@cloudflare/itty-router-openapi";

export const Password = new Str({ required: true, example: "password" });
export const Rounds = new Num({ default: 10, required: false, example: 10 });
export const Hash = new Str({
  example: "$2a$10$0AeRIW6lLG4Nz5uCLItonuasTNdScKoLzBX9hIzIII371CxBcwYrO",
});

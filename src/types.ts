import { DateTime, Str, Num } from "@cloudflare/itty-router-openapi";

export const Task = {
	name: new Str({ example: "lorem" }),
	slug: String,
	description: new Str({ required: false }),
	completed: Boolean,
	due_date: new DateTime(),
};


export const Password = new Str({ required: true, example: "password"})
export const Rounds = new Num({ default: 10, required: false, example: 10})
export const Hash = new Str({ example: "$2a$12$eij28zBQqlU570pb2/otT.u997D8HqSYxvOFuHyZndJVXEGn3jhAu"})
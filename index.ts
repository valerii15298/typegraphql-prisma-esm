import "reflect-metadata";
import { buildSchema, FieldResolver, Resolver } from "type-graphql";
import path from "path";
import { Prisma } from "@prisma/client";

import { resolvers, User } from "@generated/type-graphql";
import { JSONResolver } from "graphql-scalars";

// import * as url from "url";
// const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

@Resolver((_of) => User)
class CustomResolver {
  @FieldResolver((_type) => JSONResolver, {
    nullable: true,
  })
  async data(): Promise<Prisma.JsonValue[]> {
    return ["1", "2", "3"];
  }
}

buildSchema({
  resolvers: [...resolvers, CustomResolver],
  emitSchemaFile: path.resolve(__dirname, "./generated-schema.graphql"),
  validate: false,
});

import { Resolver, FieldResolver } from "type-graphql";

import { Product } from "./product.entity";

@Resolver(() => Product)
export class ProductPropertyResolver {

  @FieldResolver(() => String)
  async url() {
    return "https://github.com/ngtrdai197/Node-Inversify";
  }
}

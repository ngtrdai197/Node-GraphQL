import { Resolver, Query, Authorized } from "type-graphql";

import { Product } from "./product.entity";

@Resolver(() => Product)
export class ProductQueryResolver {

  @Authorized()
  @Query(() => Product)
  async fetchProducts() {
    return { id: "123", name: "Mentos", price: 28000 };
  }

  @Query(() => String)
  async somethings() {
    return `Hi there ...`
  }
}
 
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  price?: string;
}

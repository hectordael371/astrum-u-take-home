import { Args, Int, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Author } from "src/models/author.model";

@Resolver(of => Author)
export class AuthorsResolver {
  constructor(
  ) {}

  @Query(returns => Author)
  async author() {
    return {id: 1, firstName: 'Hector', lastName: 'Jimenez'}
    };
}

//   @ResolveField()
//   async posts(@Parent() author: Author) {
//     const { id } = author;
//     return this.postsService.findAll({ authorId: id });
//   }
// }
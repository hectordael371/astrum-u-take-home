import { Inject } from "@nestjs/common";
import { Args, Int, Query, Resolver, Mutation } from "@nestjs/graphql";
import { AuthorizationService } from "src/services/authorization/authorization.service";
import { IAuthorizationService } from "src/services/authorization/authorization.service.interface";

@Resolver()
export class AuthorizationResolver {
    constructor(
        @Inject(AuthorizationService)
        private authorizationService: IAuthorizationService
    ) { }

    @Query(() => String)
    async authorize(): Promise<string> {
        return this.authorizationService.getToken();
    }
}
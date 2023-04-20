import { Inject } from "@nestjs/common";
import { Args, Int, Query, Resolver } from "@nestjs/graphql";
import { University } from 'src/schemas'
import { UniversityService } from "src/services/university/university.service";
import { IUniversityService } from "src/services/university/university.service.interface";

@Resolver()
export class UniversityResolver {
  constructor(
    @Inject(UniversityService)
    private universityService: IUniversityService
  ) { }

  @Query(() => [University])
  async universities(): Promise<University[]> {
    return this.universityService.getUniversities();
  }

  @Query(() => University)
  async university(@Args('id', { type: () => Int }) id: number): Promise<University> {
    return this.universityService.getUniversityById(id);
  }
}
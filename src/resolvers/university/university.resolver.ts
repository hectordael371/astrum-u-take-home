/**
 * This module defines a resolver class for handling GraphQL queries and mutations related to universities.
 * It imports necessary modules from NestJS and other custom modules to handle the functionality.
 */

import { Inject, Logger } from "@nestjs/common";
import { Args, Int, Query, Resolver, Mutation } from "@nestjs/graphql";
import { UseGuards } from '@nestjs/common';
import { University } from 'src/schemas'
import { UniversityService } from "src/services/university/university.service";
import { IUniversityService } from "src/services/university/university.service.interface";
import { JwtAuthGuard } from "src/authorization/authorization.guard";
import { EventMessages } from "src/logging/event.messages";

@Resolver()
export class UniversityResolver {
  /**
   * This constructor method initializes the necessary services and modules to handle university-related functionality.
   * @param universityService - The UniversityService instance used to handle university data.
   * @param logger - The Logger instance used to log events related to university data.
   */
  constructor(
    @Inject(UniversityService) private universityService: IUniversityService,
    @Inject(Logger) private logger: Logger
  ) { }

  /**
   * This query method retrieves all universities in the system.
   * @returns A Promise that resolves to an array of University objects.
   */
  @Query(() => [University])
  async universities(): Promise<University[]> {
    this.logger.log(EventMessages.GetAllUniversitiesRequestReceived);
    return this.universityService.getUniversities();
  }

  /**
   * This query method retrieves a specific university by ID.
   * @param id - The ID of the university to retrieve.
   * @returns A Promise that resolves to a single University object.
   */
  @Query(() => University)
  async university(@Args('id', { type: () => Int }) id: number): Promise<University> {
    this.logger.log(EventMessages.GetUniversityByIdRequestReceived);
    return this.universityService.getUniversityById(id);
  }

  /**
   * This mutation method creates a new university in the system.
   * @param university - The University object to create.
   * @returns A Promise that resolves to the ID of the newly created university.
   */
  @Mutation(() => Int)
  @UseGuards(JwtAuthGuard)
  async createUniversity(@Args('university', { type: () => University}) university: University): Promise<number> {
    this.logger.log(EventMessages.CreateUniversityRequestReceived);
    return this.universityService.createUniversity(university);
  }

  /**
   * This mutation method updates an existing university in the system.
   * @param university - The University object to update.
   * @returns A Promise that resolves to the ID of the updated university.
   */
  @Mutation(() => Int)
  @UseGuards(JwtAuthGuard)
  async updateUniversity(@Args('university', { type: () => University}) university: University): Promise<number> {
    this.logger.log(EventMessages.UpdateUniversityRequestReceived);
    return this.universityService.updateUniversity(university);
  }
}

import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UniversityService } from './services/university/university.service';
import { UniversityRepository } from './repositories/university/university.repository';
import { UniversityResolver } from './resolvers/university/university.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true
    }),
  ],
  providers:[UniversityResolver, UniversityService, UniversityRepository]
})
export class AppModule {}
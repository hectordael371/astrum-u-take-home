import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UniversityService } from './services/university/university.service';
import { UniversityRepository } from './repositories/university/university.repository';
import { UniversityResolver } from './resolvers/university/university.resolver';
import { AuthorizationResolver } from './resolvers/authorization/authorization.resolver';
import { AuthorizationService } from './services/authorization/authorization.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './authorization/authorization.strategy';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true
    }),
    PassportModule.register({ 
      defaultStrategy: 'jwt' 
    }),
    JwtModule.register({
      secret: 'test-secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers:[
    UniversityResolver, 
    UniversityService, 
    UniversityRepository,
    AuthorizationResolver,
    AuthorizationService,
    JwtStrategy
  ]
})
export class AppModule {}
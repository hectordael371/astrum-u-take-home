import { Injectable } from '@nestjs/common';
import { IAuthorizationService } from './authorization.service.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthorizationService implements IAuthorizationService {
  constructor(
    private jwtService: JwtService
  ) { }

  getToken(): string {
    return this.jwtService.sign({ name: "TestUser" })
  }
}

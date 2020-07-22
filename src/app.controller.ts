import { Controller, Get } from '@nestjs/common';
import { UserService } from './service/user/user.service';
import { userInfo } from 'os';
import { AdministratorService } from './service/administrator/administrator.service';
import { User } from '../entities/User';

@Controller()
export class AppController {
  constructor(
    private administratorService: AdministratorService,
    private userService: UserService
  ){}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Get('allusers/')
  getAllUsers(): Promise<User[]> {
    return this.userService.getAll();
  }
}
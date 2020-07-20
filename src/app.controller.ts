import { Controller, Get } from '@nestjs/common';
import { User } from 'entieties/user.entity';
import { UserService } from './service/user/user.service';
import { userInfo } from 'os';
import { AdministratorService } from './service/administrator/administrator.service';

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
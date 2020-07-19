import { Controller, Get } from '@nestjs/common';
import { Administrator } from 'entieties/administrator.entity';
import { AdministratorService } from './service/administrator/administrator.service';

@Controller()
export class AppController {
  constructor (
    private administratorService: AdministratorService
  ) 
  {}
  @Get()
  getHello(): string {
    return 'Hello World!';
  }
  @Get('app/admins/')
  getAllAdmins(): Promise<Administrator[]> {
    return this.administratorService.getAll();
  }
}

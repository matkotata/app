import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from '../config/database.configuration';
import { AdministratorService } from './service/administrator/administrator.service';
import { UserService } from './service/user/user.service';
import { Administrator } from '../entities/Administrator';
import { User } from '../entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      host: databaseConfiguration.hostname,
      type: 'mysql',
      database: databaseConfiguration.database,
      port: 3306,
      username: databaseConfiguration.username,
      password: databaseConfiguration.password,
      entities: [Administrator,User]
    }),
    TypeOrmModule.forFeature([Administrator,User])
  ],
  controllers: [AppController],
  providers: [AdministratorService, UserService],
})
export class AppModule {}

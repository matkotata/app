import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './service/administrator/administrator.service';
import { AdministratorController } from './controllers/api/administrator.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: databaseConfiguration.hostname,
      port: 3306,
      username: databaseConfiguration.username,
      password: databaseConfiguration.password,
      database: databaseConfiguration.database,
      entities: [ Administrator ]
    }),
    TypeOrmModule.forFeature([Administrator])
  ],
  controllers: [
    AppController, 
    AdministratorController
  ],
  providers: [AdministratorService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entieties/administrator.entity';
import { AdministratorService } from './service/administrator/administrator.service';


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
  controllers: [AppController],
  providers: [AdministratorService],
})
export class AppModule {}

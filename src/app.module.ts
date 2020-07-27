import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'entities/administrator.entity';
import { AdministratorService } from './service/administrator/administrator.service';
import { AdministratorController } from './controllers/api/administrator.controller';
import { ArticleFeature } from 'entities/article-feature.entity';
import { ArticlePrice } from 'entities/article-price.entity';
import { Article } from 'entities/article.entity';
import { CartArticle } from 'entities/cart-article.entity';
import { Cart } from 'entities/cart.entity';
import { Category } from 'entities/category.entity';
import { Feature } from 'entities/feature.entity';
import { Order } from 'entities/order.entity';
import { Photo } from 'entities/photo.entity';
import { User } from 'entities/user.entity';
import { CategoryService } from './service/category/category.service';
import { CategoryController } from './controllers/api/category.controller';
import { ArticleService } from './service/article/article.service';
import { ArticleController } from './controllers/api/article.controller';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: databaseConfiguration.hostname,
      port: 3306,
      username: databaseConfiguration.username,
      password: databaseConfiguration.password,
      database: databaseConfiguration.database,
      entities: [ 
        Administrator,
        ArticleFeature,
        ArticlePrice,
        Article,
        CartArticle,
        Cart,
        Category,
        Feature,
        Order,
        Photo,
        User
       ]
    }),
    TypeOrmModule.forFeature([
      Administrator,
      Category,
      Article
    ])
  ],
  controllers: [
    AdministratorController,
    CategoryController,
    ArticleController,
  ],
  providers: [
    AdministratorService,
    CategoryService,
    ArticleService,
  ],
})
export class AppModule {}

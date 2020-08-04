import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfiguration } from 'config/database.configuration';
import { Administrator } from 'src/entities/administrator.entity';
import { AdministratorService } from './service/administrator/administrator.service';
import { AdministratorController } from './controllers/api/administrator.controller';
import { ArticleFeature } from 'src/entities/article-feature.entity';
import { ArticlePrice } from 'src/entities/article-price.entity';
import { Article } from 'src/entities/article.entity';
import { CartArticle } from 'src/entities/cart-article.entity';
import { Cart } from 'src/entities/cart.entity';
import { Category } from 'src/entities/category.entity';
import { Feature } from 'src/entities/feature.entity';
import { Order } from 'src/entities/order.entity';
import { Photo } from 'src/entities/photo.entity';
import { User } from 'src/entities/user.entity';
import { CategoryService } from './service/category/category.service';
import { CategoryController } from './controllers/api/category.controller';
import { ArticleService } from './service/article/article.service';
import { ArticleController } from './controllers/api/article.controller';
import { UserController } from './controllers/api/user.controller';
import { UserService } from './service/user/user.service';
import { AuthController } from './controllers/api/auth.administrator.controller';
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PhotoService } from './service/photo/photo.service';

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
      Article,
      ArticlePrice,
      ArticleFeature,
      User,
      Photo,
    ])
  ],
  controllers: [
    AdministratorController,
    CategoryController,
    ArticleController,
    UserController,
    AuthController,
  ],
  providers: [
    AdministratorService,
    CategoryService,
    ArticleService,
    UserService,
    PhotoService
  ],
  exports: [
    AdministratorService
  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
    .apply(AuthMiddleware)
    .exclude('/login/admin')
    .forRoutes('/api/*')
  }
}

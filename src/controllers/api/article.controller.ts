import { Controller } from "@nestjs/common";
import { ArticleService } from "src/service/article/article.service";
import { Crud } from "@nestjsx/crud";
import { Article } from "entities/article.entity";
import { query } from "express";

@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params: {
        id: {
            primary: true,
            type: 'number',
            field: 'articleId'
        }
    },
    query: {
        join: {
            category: {
                eager: true
            },
            photos: {
                eager: true
            },
            articlePrices: {
                eager: true
            },
            articleFeatures: {
                eager: true
            },
        }
    }
})
export class ArticleController {
    constructor( public service: ArticleService ){}
}
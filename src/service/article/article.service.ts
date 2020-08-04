import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/entities/article.entity";
import { Repository } from "typeorm";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ArticlePrice } from "src/entities/article-price.entity";
import { ArticleFeature } from "src/entities/article-feature.entity";

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
    constructor( 
        @InjectRepository(Article) 
        private readonly article: Repository<Article>,

        @InjectRepository(ArticlePrice)
        private readonly articlePrice: Repository<ArticlePrice>,

        @InjectRepository(ArticleFeature)
        private readonly articleFeature: Repository<ArticleFeature>
    ) {
        super(article);
    }

    async createFullArticle(data: AddArticleDto): Promise<Article> {
        let newArticle = new Article();
        newArticle.name = data.name;
        newArticle.excerpt = data.excerpt;
        newArticle.description = data.description;
        newArticle.categoryId = data.categoryId;
        let savedArticle = await this.article.save(newArticle);

        let newArticlePrice = new ArticlePrice();
        newArticlePrice.price = data.price;
        newArticlePrice.articleId = newArticle.articleId;
        await this.articlePrice.save(newArticlePrice);

        for(let feature of data.features) {
            let newArticleFeature = new ArticleFeature();
            newArticleFeature.articleId = savedArticle.articleId;
            newArticleFeature.value = feature.value;
            newArticleFeature.featureId = feature.featureId;

            await this.articleFeature.save(newArticleFeature);
        }
        return await this.article.findOne(savedArticle.articleId, {
            relations: [
                "articleFeatures",
                "articlePrices",
                "features",
                "category"
            ]
        });
    }
}
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/entities/article.entity";
import { Repository } from "typeorm";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { ArticlePrice } from "src/entities/article-price.entity";
import { ArticleFeature } from "src/entities/article-feature.entity";
import { Photo } from "src/entities/photo.entity";
import { ApiResponse } from "src/misc/api.response.class";

@Injectable()
export class ArticleService extends TypeOrmCrudService<Article> {
    constructor( 
        @InjectRepository(Article) 
        private readonly article: Repository<Article>,

        @InjectRepository(ArticlePrice)
        private readonly articlePrice: Repository<ArticlePrice>,

        @InjectRepository(ArticleFeature)
        private readonly articleFeature: Repository<ArticleFeature>,

        @InjectRepository(Photo)
        private readonly photo: Repository<Photo>
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
    async getPhoto(articleId, photoId): Promise<Photo | null>{
        let newPhoto = await this.photo.findOne({
            articleId: articleId,
            photoId: photoId
        });
        if(!newPhoto) {
            return null;
        }

        return newPhoto;
    }
}
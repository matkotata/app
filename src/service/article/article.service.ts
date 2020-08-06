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
import { EditArticleDto } from "src/dtos/article/edit.article.dto";

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

    async edit(id: number, data: EditArticleDto): Promise<Article | ApiResponse> {
        const newArticle = await this.article.findOne(id, {
            relations: [ "articlePrices",
                         "articleFeatures",
            ]
        });
        if(!newArticle) {
            return new ApiResponse('Enter valid ArticleId',-2002);
        }
        newArticle.excerpt = data.excerpt;
        newArticle.description = data.description;
        newArticle.isPromoted = data.isPromoted;
        newArticle.name = data.name;
        newArticle.status = data.status;
        await this.article.save(newArticle);

        let newPrice: string = Number(data.price).toFixed(2);

        let lastPrice = newArticle.articlePrices[newArticle.articlePrices.length-1].price;
        let lastPriceString: string = Number(lastPrice).toFixed(2);

        if(newPrice !== lastPriceString) {
            let newArticlePrice = new ArticlePrice();
            newArticlePrice.articleId = id;
            newArticlePrice.price = data.price;

            const savedArticlePrice: ArticlePrice = await this.articlePrice.save(newArticlePrice);
            if(!savedArticlePrice) {
                return new ApiResponse('Can not save price',-2003);
            }
        }

        if(data.features!==null) {
            await this.articleFeature.remove(newArticle.articleFeatures);

            for(let feature of data.features) {
                let newFeature = new ArticleFeature();
                newFeature.articleId = id;
                newFeature.featureId = feature.featureId;
                newFeature.value = feature.value;
                
                await this.articleFeature.save(newFeature);
            }
        }
        return await this.article.findOne(id, {
            relations: [
                "category",
                "articleFeatures",
                "features",
                "articlePrices"
            ]
        })
        
    }
}
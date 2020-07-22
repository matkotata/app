"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleFeature = void 0;
const typeorm_1 = require("typeorm");
const Article_1 = require("./Article");
const Feature_1 = require("./Feature");
let ArticleFeature = class ArticleFeature {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({
        type: "int",
        name: "article_feature_id",
        unsigned: true,
    }),
    __metadata("design:type", Number)
], ArticleFeature.prototype, "articleFeatureId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "article_id", unsigned: true, default: () => "'0'" }),
    __metadata("design:type", Number)
], ArticleFeature.prototype, "articleId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "feature_id", unsigned: true, default: () => "'0'" }),
    __metadata("design:type", Number)
], ArticleFeature.prototype, "featureId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "value", length: 255, default: () => "'0'" }),
    __metadata("design:type", String)
], ArticleFeature.prototype, "value", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Article_1.Article, (article) => article.articleFeatures, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "article_id", referencedColumnName: "articleId" }]),
    __metadata("design:type", Article_1.Article)
], ArticleFeature.prototype, "article", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Feature_1.Feature, (feature) => feature.articleFeatures, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "feature_id", referencedColumnName: "featureId" }]),
    __metadata("design:type", Feature_1.Feature)
], ArticleFeature.prototype, "feature", void 0);
ArticleFeature = __decorate([
    typeorm_1.Index("fk_article_feature_feature_id", ["featureId"], {}),
    typeorm_1.Index("uq_article_article_feature_article_id_feature_id", ["articleId", "featureId"], { unique: true }),
    typeorm_1.Entity("article_feature", { schema: "aplikacija" })
], ArticleFeature);
exports.ArticleFeature = ArticleFeature;
//# sourceMappingURL=ArticleFeature.js.map
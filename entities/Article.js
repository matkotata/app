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
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const ArticleFeature_1 = require("./ArticleFeature");
const ArticlePrice_1 = require("./ArticlePrice");
const CartArticle_1 = require("./CartArticle");
const Category_1 = require("./Category");
const Photo_1 = require("./Photo");
let Article = class Article {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true }),
    __metadata("design:type", Number)
], Article.prototype, "articleId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "name", length: 128, default: () => "'0'" }),
    __metadata("design:type", String)
], Article.prototype, "name", void 0);
__decorate([
    typeorm_1.Column("int", { name: "category_id", unsigned: true, default: () => "'0'" }),
    __metadata("design:type", Number)
], Article.prototype, "categoryId", void 0);
__decorate([
    typeorm_1.Column("varchar", { name: "excerpt", length: 255, default: () => "'0'" }),
    __metadata("design:type", String)
], Article.prototype, "excerpt", void 0);
__decorate([
    typeorm_1.Column("text", { name: "description" }),
    __metadata("design:type", String)
], Article.prototype, "description", void 0);
__decorate([
    typeorm_1.Column("enum", {
        name: "status",
        enum: ["avaliable", "visiable", "hidden"],
        default: () => "'avaliable'",
    }),
    __metadata("design:type", String)
], Article.prototype, "status", void 0);
__decorate([
    typeorm_1.Column("tinyint", {
        name: "is_promoted",
        unsigned: true,
        default: () => "'0'",
    }),
    __metadata("design:type", Number)
], Article.prototype, "isPromoted", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => ArticleFeature_1.ArticleFeature, (articleFeature) => articleFeature.article),
    __metadata("design:type", Array)
], Article.prototype, "articleFeatures", void 0);
__decorate([
    typeorm_1.OneToMany(() => ArticlePrice_1.ArticlePrice, (articlePrice) => articlePrice.article),
    __metadata("design:type", Array)
], Article.prototype, "articlePrices", void 0);
__decorate([
    typeorm_1.OneToMany(() => CartArticle_1.CartArticle, (cartArticle) => cartArticle.article),
    __metadata("design:type", Array)
], Article.prototype, "cartArticles", void 0);
__decorate([
    typeorm_1.ManyToOne(() => Category_1.Category, (category) => category.articles, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }]),
    __metadata("design:type", Category_1.Category)
], Article.prototype, "category", void 0);
__decorate([
    typeorm_1.OneToMany(() => Photo_1.Photo, (photo) => photo.article),
    __metadata("design:type", Array)
], Article.prototype, "photos", void 0);
Article = __decorate([
    typeorm_1.Index("fk_category", ["categoryId"], {}),
    typeorm_1.Entity("article", { schema: "aplikacija" })
], Article);
exports.Article = Article;
//# sourceMappingURL=Article.js.map
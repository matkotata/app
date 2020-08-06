import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { ArticleFeature } from "./article-feature.entity";
import { ArticlePrice } from "./article-price.entity";
import { CartArticle } from "./cart-article.entity";
import { Category } from "./category.entity";
import { Photo } from "./photo.entity";
import { Feature } from "./feature.entity";

@Index("fk_category", ["categoryId"], {})
@Entity("article")
export class Article {
  @PrimaryGeneratedColumn({ type: "int", name: "article_id", unsigned: true })
  articleId: number;

  @Column({ type: "varchar", length: 128})
  name: string;

  @Column({ type: "int", name: "category_id", unsigned: true})
  categoryId: number;

  @Column({ type: "varchar", length: 255})
  excerpt: string;

  @Column({ type: "text" })
  description: string;

  @Column({
    type: "enum",
    enum: ["avaliable", "visiable", "hidden"],
    default: () => "'avaliable'",
  })
  status: "avaliable" | "visible" | "hidden";

  @Column("tinyint", {
    name: "is_promoted",
    unsigned: true,
  })
  isPromoted: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => ArticleFeature, (articleFeature) => articleFeature.article)
  articleFeatures: ArticleFeature[];

  @OneToMany(() => ArticlePrice, (articlePrice) => articlePrice.article)
  articlePrices: ArticlePrice[];

  @OneToMany(() => CartArticle, (cartArticle) => cartArticle.article)
  cartArticles: CartArticle[];

  @ManyToMany(type => Feature, feature => feature.articles)
  @JoinTable({
    name: "article_feature",
    joinColumn: {name: "article_id", referencedColumnName: "articleId"},
    inverseJoinColumn: { name: "feature_id", referencedColumnName: "featureId" }
  })
  features: Feature[];

  @ManyToOne(() => Category, (category) => category.articles, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;

  @OneToMany(() => Photo, (photo) => photo.article)
  photos: Photo[];
}

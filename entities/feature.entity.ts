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
import { Category } from "./category.entity";
import { Article } from "./article.entity";

@Index("fk_feature_category_id", ["categoryId"], {})
@Index("uq_name_category_id", ["name", "categoryId"], { unique: true })
@Entity("feature")
export class Feature {
  @PrimaryGeneratedColumn({ type: "int", name: "feature_id", unsigned: true })
  featureId: number;

  @Column({ type: "double", precision: 22})
  name: number;

  @Column("int", { name: "category_id", unsigned: true})
  categoryId: number;

  @OneToMany(() => ArticleFeature, (articleFeature) => articleFeature.feature)
  articleFeatures: ArticleFeature[];

  @ManyToMany(type => Article, article => article.features)
  @JoinTable({
    name: "article_features",
    joinColumn: { name: "feature_id", referencedColumnName: "featureId" },
    inverseJoinColumn: { name: "article_id", referencedColumnName: "articleId" }
  })
  articles: Article[];

  @ManyToOne(() => Category, (category) => category.features, {
    onDelete: "RESTRICT",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Category;
}

import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartArticle } from "./CartArticle";
import { User } from "./User";
import { Order } from "./Order";

@Index("fk_cart_user_id", ["userId"], {})
@Entity("cart", { schema: "aplikacija" })
export class Cart {
  @PrimaryGeneratedColumn({ type: "int", name: "cart_id", unsigned: true })
  cartId: number;

  @Column("int", { name: "user_id", unsigned: true, default: () => "'0'" })
  userId: number;

  @Column("timestamp", {
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @OneToMany(() => CartArticle, (cartArticle) => cartArticle.cart)
  cartArticles: CartArticle[];

  @ManyToOne(() => User, (user) => user.carts, {
    onDelete: "NO ACTION",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: User;

  @OneToOne(() => Order, (order) => order.cart)
  order: Order;
}

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
exports.Cart = void 0;
const typeorm_1 = require("typeorm");
const CartArticle_1 = require("./CartArticle");
const User_1 = require("./User");
const Order_1 = require("./Order");
let Cart = class Cart {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "cart_id", unsigned: true }),
    __metadata("design:type", Number)
], Cart.prototype, "cartId", void 0);
__decorate([
    typeorm_1.Column("int", { name: "user_id", unsigned: true, default: () => "'0'" }),
    __metadata("design:type", Number)
], Cart.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Cart.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToMany(() => CartArticle_1.CartArticle, (cartArticle) => cartArticle.cart),
    __metadata("design:type", Array)
], Cart.prototype, "cartArticles", void 0);
__decorate([
    typeorm_1.ManyToOne(() => User_1.User, (user) => user.carts, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "user_id", referencedColumnName: "userId" }]),
    __metadata("design:type", User_1.User)
], Cart.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToOne(() => Order_1.Order, (order) => order.cart),
    __metadata("design:type", Order_1.Order)
], Cart.prototype, "order", void 0);
Cart = __decorate([
    typeorm_1.Index("fk_cart_user_id", ["userId"], {}),
    typeorm_1.Entity("cart", { schema: "aplikacija" })
], Cart);
exports.Cart = Cart;
//# sourceMappingURL=Cart.js.map
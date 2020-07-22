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
exports.Order = void 0;
const typeorm_1 = require("typeorm");
const Cart_1 = require("./Cart");
let Order = class Order {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn({ type: "int", name: "order_id", unsigned: true }),
    __metadata("design:type", Number)
], Order.prototype, "orderId", void 0);
__decorate([
    typeorm_1.Column("timestamp", {
        name: "created_at",
        default: () => "CURRENT_TIMESTAMP",
    }),
    __metadata("design:type", Date)
], Order.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column("int", {
        name: "cart_id",
        unique: true,
        unsigned: true,
        default: () => "'0'",
    }),
    __metadata("design:type", Number)
], Order.prototype, "cartId", void 0);
__decorate([
    typeorm_1.Column("enum", {
        name: "status",
        enum: ["rejected", "accepted", "shipped", "pending"],
        default: () => "'pending'",
    }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    typeorm_1.OneToOne(() => Cart_1.Cart, (cart) => cart.order, {
        onDelete: "NO ACTION",
        onUpdate: "CASCADE",
    }),
    typeorm_1.JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }]),
    __metadata("design:type", Cart_1.Cart)
], Order.prototype, "cart", void 0);
Order = __decorate([
    typeorm_1.Index("uq_order_cart_id", ["cartId"], { unique: true }),
    typeorm_1.Entity("order", { schema: "aplikacija" })
], Order);
exports.Order = Order;
//# sourceMappingURL=Order.js.map
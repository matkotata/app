"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const typeorm_1 = require("@nestjs/typeorm");
const database_configuration_1 = require("../config/database.configuration");
const administrator_service_1 = require("./service/administrator/administrator.service");
const user_service_1 = require("./service/user/user.service");
const Administrator_1 = require("../entities/Administrator");
const User_1 = require("../entities/User");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                host: database_configuration_1.databaseConfiguration.hostname,
                type: 'mysql',
                database: database_configuration_1.databaseConfiguration.database,
                port: 3306,
                username: database_configuration_1.databaseConfiguration.username,
                password: database_configuration_1.databaseConfiguration.password,
                entities: [Administrator_1.Administrator, User_1.User]
            }),
            typeorm_1.TypeOrmModule.forFeature([Administrator_1.Administrator, User_1.User])
        ],
        controllers: [app_controller_1.AppController],
        providers: [administrator_service_1.AdministratorService, user_service_1.UserService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
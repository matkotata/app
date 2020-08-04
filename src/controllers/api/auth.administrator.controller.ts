import { Controller, Post, Body, Req } from "@nestjs/common";
import { AdministratorService } from "src/service/administrator/administrator.service";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { JwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import { JwtSecret } from "config/jwt.secret";
import { LoginInfoAdministratorDto } from "src/dtos/administrator/login.info.administrator.dto";

@Controller('login/admin')
export class AuthController {
    constructor(
        public administrator: AdministratorService
    ){}

    @Post() 
    async loginAdmin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInfoAdministratorDto | ApiResponse> {
        let admin = await this.administrator.getByUsername(data.username);

        if (!admin) {
            return new Promise(res => { res(new ApiResponse("No existing user",-3001)) });
        }
        let passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        if(admin.passwordHash !== passwordHashString) {
            return new Promise(res => { res(new ApiResponse("Wrong password",-3002)) });
        }

        let tokenTime = new Date();
        tokenTime.setDate(tokenTime.getDate()+14);
        const expireTokenTime = tokenTime.getTime()/1000;

        let jwtData = new JwtDataAdministratorDto();
        jwtData.administratorId = admin.administratorId;
        jwtData.username = admin.username;
        jwtData.exp = expireTokenTime;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers['user-agent'];
        
        let token: string = jwt.sign(jwtData.toPlainObject(), JwtSecret);

        const responseObject = new LoginInfoAdministratorDto(
            admin.administratorId, admin.username, token
        )

        return new Promise(res => {
            res(responseObject);
        });
    }
}

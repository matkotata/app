import { Controller, Post, Body, Req, Put } from "@nestjs/common";
import { AdministratorService } from "src/service/administrator/administrator.service";
import { LoginAdministratorDto } from "src/dtos/administrator/login.administrator.dto";
import { Administrator } from "src/entities/administrator.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import { Request } from "express";
import { JwtDataLoginDto } from "src/dtos/auth/jwt.data.administrator.dto";
import { JwtSecret } from "config/jwt.secret";
import { LoginInfoDto } from "src/dtos/auth/login.info.dto";
import { RegisterUserDto } from "src/dtos/user/register.user.dto";
import { User } from "src/entities/user.entity";
import { UserService } from "src/service/user/user.service";
import { LoginUserDto } from "src/dtos/user/login.user.dto";

@Controller()
export class AuthController {
    constructor(
        public administrator: AdministratorService,
        public user: UserService
    ){}

    @Post('login/admin') 
    async loginAdmin(@Body() data: LoginAdministratorDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse> {
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

        let jwtData = new JwtDataLoginDto();
        jwtData.role = 'administrator'
        jwtData.id = admin.administratorId;
        jwtData.identity = admin.username;
        jwtData.exp = expireTokenTime;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers['user-agent'];
        
        let token: string = jwt.sign(jwtData.toPlainObject(), JwtSecret);

        const responseObject = new LoginInfoDto(
            admin.administratorId, admin.username, token
        )

        return new Promise(res => {
            res(responseObject);
        });
    }

    @Post('/login/user')
    async loginUser(@Body() data: LoginUserDto, @Req() req: Request): Promise<LoginInfoDto | ApiResponse>{
        const newUser = await this.user.getByEmail(data.email);
        if(!newUser) {
            return new ApiResponse('Non-existing user',-5001);
        }

        let passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        let passwordHashString = passwordHash.digest('hex').toUpperCase();
        if(newUser.passwordHash !== passwordHashString) {
            return new ApiResponse('Wrong password', -5002)
        }

        const tokenTime = new Date();
        tokenTime.setDate(tokenTime.getDate()+14);
        const expireTokenTime = tokenTime.getTime()/1000;

        let jwtData = new JwtDataLoginDto();
        jwtData.role = 'user';
        jwtData.id = newUser.userId;
        jwtData.identity = data.email;
        jwtData.ip = req.ip.toString();
        jwtData.ua = req.headers['user-agent'];
        jwtData.exp = expireTokenTime;

        const token = jwt.sign(jwtData.toPlainObject(),JwtSecret);

        return new Promise(res => {
            res(new LoginInfoDto(newUser.userId, newUser.email, token ))
        });
    }
    
    @Put('/register/user')
    add(@Body() data: RegisterUserDto): Promise<User | ApiResponse> {
        return this.user.add(data);
    }
}

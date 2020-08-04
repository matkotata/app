import { NestMiddleware, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Request, NextFunction } from "express";
import { Response } from "express";
import { JwtDataAdministratorDto } from "src/dtos/administrator/jwt.data.administrator.dto";
import * as jwt from "jsonwebtoken";
import { JwtSecret } from "config/jwt.secret";
import { AdministratorService } from "src/service/administrator/administrator.service";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly administratorService: AdministratorService){}

    async use(req: Request, res: Response, next: NextFunction) {

        if(!req.headers.authorization) {
            throw new HttpException("Token not found", HttpStatus.UNAUTHORIZED);
        }
        const token = req.headers.authorization;
        const tokenParts = token.split(' ');

        if(tokenParts.length !== 2) {
            throw new HttpException('Bad token found',HttpStatus.UNAUTHORIZED);
        }

        let jwtData: JwtDataAdministratorDto;
        try {
            jwtData = jwt.verify(tokenParts[1], JwtSecret);
        } catch(e) {
            throw new HttpException('Bad tokencina found!',HttpStatus.UNAUTHORIZED);
        }
        
        if(!jwtData) {
            throw new HttpException("Bad token found", HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ua !== req.headers['user-agent']){
            throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.ip !== req.ip.toString()){
            throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
        }

        if(jwtData.exp <= new Date().getTime() / 1000){
            throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
        }

        const admin = await this.administratorService.getOne(jwtData.administratorId);
        if(!admin) {
            throw new HttpException("Unexisting admin", HttpStatus.UNAUTHORIZED);
        }

        next();
    }

}
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from '../../entities/administrator.entity';
import { Repository, Admin } from 'typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import * as crypto from "crypto";
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { async } from 'rxjs';
import { ApiResponse } from 'src/misc/api.response.class';
import { resolve } from 'path';
import { promises } from 'dns';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>
    ) {}

    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }

    async getByUsername(username: string): Promise<Administrator | null> {
        let admin = await this.administrator.findOne({
            username: username
        });
        return admin;
    }

    getOne(id: number): Promise<Administrator | ApiResponse> {
        return new Promise(async (resolve) => {
            let admin = await this.administrator.findOne(id);
            if(admin === undefined) {
                resolve(new ApiResponse("error", -1003));
            }
            resolve(admin);
        });
    }

    add(data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let admin = new Administrator();
        admin.username = data.username;
        admin.passwordHash = passwordHashString;

        return new Promise((resolve) => {
            this.administrator.save(admin)
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                const response: ApiResponse = new ApiResponse("error", -1001);
                resolve(response);
            })
        });
    }

    async editById(id: number, data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
        let admin: Administrator = await this.administrator.findOne(id);

        if(admin === undefined) {
            return new Promise((resolve) => {
                resolve(new ApiResponse("error",-1002));
            });
        }
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        admin.passwordHash = passwordHashString;
        return this.administrator.save(admin);
    }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from '../../../entities/administrator.entity';
import { Repository, Admin } from 'typeorm';
import { AddAdministratorDto } from 'src/dtos/administrator/add.administrator.dto';
import * as crypto from "crypto";
import { EditAdministratorDto } from 'src/dtos/administrator/edit.administrator.dto';
import { async } from 'rxjs';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>
    ) {}

    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }

    getOne(id: number): Promise<Administrator> {
        return this.administrator.findOne(id)
    }

    add(data: AddAdministratorDto): Promise<Administrator> {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let admin = new Administrator();
        admin.username = data.username;
        admin.passwordHash = passwordHashString

        return this.administrator.save(admin);
    }

    async editById(id: number, data: EditAdministratorDto): Promise<Administrator> {
        const passwordHash = crypto.createHash('sha512');
        passwordHash.update(data.password);
        const passwordHashString = passwordHash.digest('hex').toUpperCase();

        let admin: Administrator = await this.administrator.findOne(id);
        admin.passwordHash = passwordHashString;
        
        return this.administrator.save(admin);
    }
}

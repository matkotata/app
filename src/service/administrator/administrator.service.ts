import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Administrator } from '../../../entities/Administrator';
import { Repository } from 'typeorm';

@Injectable()
export class AdministratorService {
    constructor(
        @InjectRepository(Administrator)
        private readonly administrator: Repository<Administrator>
    ){}
    getAll(): Promise<Administrator[]> {
        return this.administrator.find();
    }
    getOne(id: number): Promise<Administrator> {
        return this.administrator.findOne(id);
    }
}

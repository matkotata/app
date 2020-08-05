import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Feature } from "src/entities/feature.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class FeatureService extends TypeOrmCrudService<Feature> {
    constructor(@InjectRepository(Feature) private readonly feature: Repository<Feature> ){ 
        super(feature);
    }
}
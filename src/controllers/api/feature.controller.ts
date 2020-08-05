import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { FeatureService } from "src/service/feature/feature.service";
import { Feature } from "src/entities/feature.entity";

@Controller('api/feature')
@Crud({
    model: {
        type: Feature
    },
    params: {
        id: {
            primary: true,
            field: 'featureId',
            type: 'number'
        }
    },
    query: {
         join: {
            articleFeatures: {
                eager: true
            },
            articles: {
                eager: false
            },
            category: {
                eager: false
            }
        } 
    }
})

export class FeatureController {
    constructor(public service: FeatureService){}
}
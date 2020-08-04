import { Controller } from "@nestjs/common";
import { Crud } from "@nestjsx/crud";
import { Category } from "src/entities/category.entity";
import { CategoryService } from "src/service/category/category.service";
import { query } from "express";

@Controller('api/category')
@Crud({
    model: {
        type: Category
    },
    params: {
        id: {
            primary: true,
            field: 'categoryId',
            type: 'number'
        }
    },
    query: {
        join: {
            categories: {
                eager: true
            },
            parentCategory: {
                eager: false
            },
            features: {
                eager: true
            },
            articles: {
                eager: false
            }
        }
    }
})
export class CategoryController {
    constructor( public service: CategoryService ) { }
}
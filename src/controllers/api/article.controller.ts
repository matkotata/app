import { Controller, Post, Body, Param, UseInterceptors, UploadedFile, Req } from "@nestjs/common";
import { ArticleService } from "src/service/article/article.service";
import { Crud } from "@nestjsx/crud";
import { Article } from "src/entities/article.entity";
import { query } from "express";
import { AddArticleDto } from "src/dtos/article/add.article.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { StorageConfig } from "config/storage.config";
import { stringify } from "querystring";
import { PhotoService } from "src/service/photo/photo.service";
import { Photo } from "src/entities/photo.entity";
import { ApiResponse } from "src/misc/api.response.class";
import * as fileType from "file-type";
import * as fs from "fs";
import { EditArticleDto } from 'src/dtos/article/edit.article.dto'

@Controller('api/article')
@Crud({
    model: {
        type: Article
    },
    params: {
        id: {
            primary: true,
            type: 'number',
            field: 'articleId'
        }
    },
    query: {
        join: {
            category: {
                eager: true
            },
            photos: {
                eager: true
            },
            articlePrices: {
                eager: true
            },
            articleFeatures: {
                eager: true
            },
        }
    },
    routes: {
        exclude: ['deleteOneBase', 'replaceOneBase', 'updateOneBase']
    }
})
export class ArticleController {
    constructor( public service: ArticleService ,
                 public photoService: PhotoService
        ){}

    @Post('api/createFull')
    createFullArticle(@Body() data: AddArticleDto){
        return this.service.createFullArticle(data);
    }

    @Post(':id/addPhoto')
    @UseInterceptors(
        FileInterceptor('photo', {
            storage: diskStorage({
                destination: StorageConfig.photos,

                filename: (req, file, callback) => {
                    let original: string = file.originalname;
                    let normailzed = original.replace(/\s+/g,'-');
        
                    let now = new Date();
                    let datePart = '';
                    datePart += now.getFullYear().toString();
                    datePart += ((now.getMonth()+1).toString());
                    datePart += now.getDate().toString();

                    let randomParts = new Array(10)
                        .fill(0)
                        .map(e => (Math.floor(Math.random()*10)).toString())
                        .join('');

                    let finalName = datePart + '-' + randomParts + '-' + normailzed;
                    callback(null, finalName);
                }
            }),
            fileFilter: (req, file, callback) => {
                if(!file.originalname.match(/\.(jpg|png|jpeg)$/)) {
                    req.fileFilterError = 'bad file extensions';
                    callback(null, false);
                    return;
                }
                if(!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))){
                    req.fileFilterError = 'bad file extensions';
                    callback(new Error('Bad file content!'),false);
                    return;
                }

                callback(null,true);
            },
            limits: {
                fields: 1,
                fileSize: 1024 * 1024 * 20,

            }
        })
    )
    async uploadPhoto(@Param('id') articleId: number, @UploadedFile() photo, @Req() req): Promise<ApiResponse | Photo>{
        if(req.fileFilterError){
            return new ApiResponse('Error', -4002, req.fileFilterError)
        }
        const newPhoto: Photo = new Photo();
        newPhoto.articleId = articleId;
        newPhoto.imagePath = photo.filename;

        if(!photo) {
            return new ApiResponse('Error', -4002, 'File not uploaded');
        }

        const fileTypeResult = await fileType.fromFile(photo.path);
        if(!fileTypeResult) {
            fs.unlinkSync(photo.path);
            return new ApiResponse("error", -4002, 'Cannot detect file type');
        }
        
        if(!(fileTypeResult.mime.includes('jpeg')|| fileTypeResult.mime.includes('png'))) {
            fs.unlinkSync(photo.path);
            return new ApiResponse("error", -4002, 'Baad mime');
        }

        const savedPhoto = await this.photoService.add(newPhoto);
        if(!savedPhoto){
            return new ApiResponse('Error', -4001);
        }
        return savedPhoto;
    }

    @Post(':articleId/deletePhoto/:photoId')
    async deletePhoto(@Param('articleId') articleId: number,
                      @Param('photoId') photoId: number): Promise<ApiResponse> {
        let photo: Photo = await this.service.getPhoto(articleId,photoId);
        
        if(photo===null) {
            return new ApiResponse('error', -4003);
        }

        fs.unlinkSync(StorageConfig.photos + photo.imagePath);
        const deletedPhotos = await this.photoService.deletePhoto(photoId);
        if(deletedPhotos.affected===0){
            return new ApiResponse('error',-4003);
        }
        return new ApiResponse('Deleted',1000); 
    }

    @Post(':id/edit')
    editFullArticle(@Param('id') id: number,@Body() data: EditArticleDto) {
        return this.service.edit(id, data);
    }
}
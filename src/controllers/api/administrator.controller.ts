import { AdministratorService } from "src/service/administrator/administrator.service";
import { Get, Param, Controller, Put, Body, Post } from "@nestjs/common";
import { Administrator } from "entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { promises } from "dns";
import { ApiResponse } from "src/misc/api.response.class";

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administrator: AdministratorService
    ){}
    @Get()
    getAll(): Promise<Administrator[]>{
        return this.administrator.getAll();
    }

    @Get(':id')
    getOne(@Param('id') administratorId: number): Promise<Administrator | ApiResponse> {
        return this.administrator.getOne(administratorId);
    }

    @Put()
    add( @Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administrator.add(data);
    }

    @Post(':id')
    editById(@Param('id') id:number,@Body() data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administrator.editById(id,data);
    }
}
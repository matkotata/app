import { AdministratorService } from "src/service/administrator/administrator.service";
import { Get, Param, Controller, Put, Body, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { Administrator } from "src/entities/administrator.entity";
import { AddAdministratorDto } from "src/dtos/administrator/add.administrator.dto";
import { EditAdministratorDto } from "src/dtos/administrator/edit.administrator.dto";
import { promises } from "dns";
import { ApiResponse } from "src/misc/api.response.class";
import { AllowToRoles } from "src/misc/allow.to.roles.descriptor";
import { RoleCheckedGuard } from "src/misc/role.checker.guard";

@Controller('api/administrator')
export class AdministratorController {
    constructor(
        private administrator: AdministratorService
    ){}
    
    @Get()
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
    getAll(): Promise<Administrator[]>{
        return this.administrator.getAll();
    }

    @Get(':id')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
    getOne(@Param('id') administratorId: number): Promise<Administrator | ApiResponse> {
        return this.administrator.getOne(administratorId);
    }

    @Put()
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
    add( @Body() data: AddAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administrator.add(data);
    }

    @Post(':id')
    @UseGuards(RoleCheckedGuard)
    @AllowToRoles('administrator')
    editById(@Param('id') id:number,@Body() data: EditAdministratorDto): Promise<Administrator | ApiResponse> {
        return this.administrator.editById(id,data);
    }
}
import { Controller, Param } from '@nestjs/common';
import { Get, Post } from '@nestjs/common/decorators/http/request-mapping.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { CreateRoleDto } from './dto/craeteRole.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
    constructor(private rolesService:RolesService){}

    @Post()
    async create(@Body() rolesDto:CreateRoleDto){
        return await this.rolesService.createRole(rolesDto)
    }

    @Get()
    async getAll(){
        return await this.rolesService.getAllRoles()
    }

    @Get('/:value')
    async getByValue(@Param('value') value:string){
        return await this.rolesService.getRoleByValue(value)
    }
}

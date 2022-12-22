import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from './roles';
import { User } from 'src/users/user';

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports:[TypeOrmModule.forFeature([Roles,User])],
  exports:[RolesService]
  
})
export class RolesModule {}

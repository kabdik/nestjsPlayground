import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from './posts';
import { User } from 'src/users/user';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [PostsService],
  controllers: [PostsController],
  imports:[TypeOrmModule.forFeature([User,Posts]),FilesModule,AuthModule,UsersModule]
})
export class PostsModule {}

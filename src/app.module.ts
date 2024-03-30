import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogsModule } from './blogs/blogs.module';
import {Blog} from './blogs/entities/blog.entity';

@Module({
  imports:[
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService)=>({
        type: 'postgres',
        url: configService.get<string>('DB_URL'),
        ssl: true,
        entities: [join(process.cwd(), 'dist/**/*.entity{.js, .ts}')],
        
        synchronize: true,
      })
    }),
    BlogsModule
  ],
})

export class AppModule{}
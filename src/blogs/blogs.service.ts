import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import{ Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class BlogsService {
  
  constructor (
    @InjectRepository(Blog)
    private readonly blogsRepository: Repository<Blog>){
    
  }
  async create(createBlogDto: CreateBlogDto) {
    const blog = this.blogsRepository.create(createBlogDto)
    return await this.blogsRepository.save(blog)
  }

  async findAll() {
    return await this.blogsRepository.find();
  }

  async findOne(id: number) {
    return await this.blogsRepository.findOne({where: {id}});
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogsRepository.findOne({where: {id}})
    if(!blog){
      throw new NotFoundException;
    }
    Object.assign(blog, updateBlogDto);
    console.log(blog)
    return await this.blogsRepository.save(blog);
  }

  async remove(id: number) {
    const blog = await this.blogsRepository.findOne({where:{ id }})
    if(!blog){
      throw new NotFoundException;
    }
    return this.blogsRepository.remove(blog);
  }
}

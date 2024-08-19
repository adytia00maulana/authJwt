import { Injectable, Logger, NotFoundException } from "@nestjs/common";
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prismaService: PrismaService, private readonly logger: Logger) {
  }
  create(createArticleDto: CreateArticleDto) {
    this.logger.log(`${ArticlesService.name} - Create Successfully With Body ${JSON.stringify(createArticleDto)}`);
    return this.prismaService.article.create({ data: createArticleDto });
  }

  findAll() {
    this.logger.log(`${ArticlesService.name} - Find All Published`);
    return this.prismaService.article.findMany({ where: { published: true } });
  }

  findDrafts() {
    this.logger.log(`${ArticlesService.name} - Find All Not Published`);
    return this.prismaService.article.findMany({ where: { published: false } });
  }

  async findOne(id: number) {
    this.logger.log(`${ArticlesService.name} - Find by Id ${id}`);

    const article = await this.prismaService.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    if(!article) throw new NotFoundException('User not found');
    return article;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    this.logger.log(`${ArticlesService.name} - Update by Id ${id} With Body ${JSON.stringify(updateArticleDto)}`);
    return this.prismaService.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    this.logger.log(`${ArticlesService.name} - Delete by Id ${id}`);
    return this.prismaService.article.delete({ where: { id } });
  }
}

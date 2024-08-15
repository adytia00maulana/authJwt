import { Injectable, Logger } from "@nestjs/common";
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {
  }
  create(createArticleDto: CreateArticleDto) {
    this.logger.log(`${ArticlesService.name} - Create Successfully With Body ${JSON.stringify(createArticleDto)}`);
    return this.prisma.article.create({ data: createArticleDto });
  }

  findAll() {
    this.logger.log(`${ArticlesService.name} - Find All Published`);
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findDrafts() {
    this.logger.log(`${ArticlesService.name} - Find All Not Published`);
    return this.prisma.article.findMany({ where: { published: false } });
  }

  findOne(id: number) {
    this.logger.log(`${ArticlesService.name} - Find by Id ${id}`);
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    this.logger.log(`${ArticlesService.name} - Update by Id ${id} With Body ${JSON.stringify(updateArticleDto)}`);
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    this.logger.log(`${ArticlesService.name} - Delete by Id ${id}`);
    return this.prisma.article.delete({ where: { id } });
  }
}

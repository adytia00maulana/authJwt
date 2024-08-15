import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { Article as articleEntity } from './entities/article.entity';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiOkResponse({ type: articleEntity })
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({ type: articleEntity, isArray: true })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({ type: articleEntity, isArray: true })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({ type: articleEntity })
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(+id);
    if (!article) {
      throw new NotFoundException(`Article with ${+id} does not exist.`);
    }
    return article;
  }

  @Patch(':id')
  @ApiOkResponse({ type: articleEntity })
  update(@Param('id', ParseIntPipe) id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: articleEntity })
  remove(@Param('id', ParseIntPipe) id: string) {
    return this.articlesService.remove(+id);
  }
}

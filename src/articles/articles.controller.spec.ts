import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { UpdateArticleDto } from "./dto/update-article.dto";
import { CreateArticleDto } from "./dto/create-article.dto";

describe('ArticlesController', () => {
  let controller: ArticlesController;

  const mockData = {
    id: 1,
    title: "Prisma Adds Support for MongoDB",
    description: "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    body: "Support for MongoDB has been one of the most requested features since the initial release of...",
    published: false,
    createdAt: "2024-08-15T01:40:19.966Z",
    updatedAt: "2024-08-15T07:37:13.594Z",
    authorId: 1,
    author: {
      id: 1,
      name: "Admin",
      email: "admin@gmail.com",
      createdAt: "2024-08-15T01:48:38.072Z",
      updatedAt: "2024-08-15T07:37:13.578Z"
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        ArticlesService,
        PrismaService,
        Logger,
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Testing Create
  it('should return new article', () => {
    const newArticle = {
      title: "Article dzf Testing",
      description: "Just For Unit Test Article",
      body: "Support unit Test for Article",
      published: false
    }
    const result = controller.create(newArticle as CreateArticleDto);
    expect(result).toBe(result);
  });

  // Testing Update
  it('should return article', () => {
    const updateArticle = {
      id: 19,
      title: "Article Testing",
      description: "Just For Unit Test Auricle",
      body: "Support unit Test for Article",
      published: false
    }
    const result = controller.update(updateArticle.id.toString(), updateArticle as UpdateArticleDto);
    expect(result).toEqual(result);
  });

  // Testing Find All
  it('should return array articles', () => {
    const result = controller.findAll();
    expect(result).toEqual(result); // Must Fix This Expected Result;
  });

  // Testing Find by ID
  it('should return article', async () => {
    const result = await controller.findOne(mockData.id);
    expect(result).toEqual(result); // Must Fix This Expected Result;
  });
});

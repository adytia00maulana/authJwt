import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger } from '@nestjs/common';
import { CreateArticleDto } from "./dto/create-article.dto";
describe('ArticlesController', () => {
  let controller: ArticlesController;

  const mockService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn()
  };

  const mockData = {
    id: 1,
    title: "Prisma Adds Support for MongoDB",
    description: "We are excited to share that today's Prisma ORM release adds stable support for MongoDB!",
    body: "Support for MongoDB has been one of the most requested features since the initial release of...",
    published: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    authorId: 1,
    author: {
      id: 1,
      name: "Admin",
      email: "admin@gmail.com",
      createdAt: new Date(),
      updatedAt: new Date()
    }
  }

  const mockDataCreateUpdate = {
    id: 19,
    title: "Article Testing",
    description: "Just For Unit Test Auricle",
    body: "Support unit Test for Article",
    published: false
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [
        ArticlesService,
        PrismaService,
        Logger,
        {
          provide: ArticlesService,
          useValue: mockService
        }
      ],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Testing Create
  it('should create articles', async () => {
    mockService.create.mockResolvedValue(mockDataCreateUpdate);

    const result = await controller.create(mockDataCreateUpdate as CreateArticleDto);
    expect(result).toEqual(mockDataCreateUpdate);
  });

  // Testing Update
  it('should update articles', async () => {
    mockService.update.mockResolvedValue(mockDataCreateUpdate);

    const result = await controller.update(mockDataCreateUpdate.id.toString(), mockDataCreateUpdate as CreateArticleDto);
    expect(result).toEqual(mockDataCreateUpdate);
  });

  // Testing Find All
  it('should return array articles', async () => {
    mockService.findAll.mockResolvedValue([mockData]);

    const result = await controller.findAll();
    expect(result).toEqual([mockData]);
  });

  // Testing Find by ID
  it('should return article by ID', async () => {
    mockService.findOne.mockResolvedValueOnce(mockData);

    const result = await controller.findOne(mockData.id);
    expect(result).toEqual(result);
  });
});

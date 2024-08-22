import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger, NotFoundException } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";

describe('ArticlesService', () => {
  let service: ArticlesService;

  const mockPrisma = {
    article: {
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      findUnique: jest.fn(),
      findMany: jest.fn()
    },
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
      providers: [
        PrismaService,
        ArticlesService,
        Logger,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  // Testing Create
  describe('create', () => {
    it('should create', async () => {
      mockPrisma.article.create.mockResolvedValueOnce(mockDataCreateUpdate);

      const result = await service.create(mockDataCreateUpdate as CreateArticleDto);
      expect(result).toEqual(mockDataCreateUpdate);
    });
  });

  // Testing Update
  describe('update', () => {
    it('should update', async () => {
      mockPrisma.article.update.mockResolvedValue(mockDataCreateUpdate);

      const result = await service.update(mockDataCreateUpdate.id, mockDataCreateUpdate as UpdateArticleDto);
      expect(result).toEqual(mockDataCreateUpdate);
    });
  });

  // Testing Find All
  describe('findAll', () => {
    it('should return Array Articles', async () => {
      mockPrisma.article.findMany.mockResolvedValue([mockData]);
      const result = await service.findAll();
      expect(result).toEqual([mockData]);
    });

    it("should return empty array if there are no articles", async () => {
      mockPrisma.article.findMany.mockResolvedValue([]);
      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  // Testing Find By ID
  describe('findByID', () => {
    it('should return a article by ID', async () => {
      mockPrisma.article.findUnique.mockResolvedValueOnce(mockData);
      const result = await service.findOne(mockData.id);
      expect(result).toEqual(mockData);
      expect(mockPrisma.article.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrisma.article.findUnique).toHaveBeenCalledWith({
        where: { id: mockData.id },
        include: {
          author: true,
        },
      });
    })

    it("should throw NotFoundException if article is not found", async () => {
      mockPrisma.article.findUnique.mockResolvedValueOnce(null);
      await expect(service.findOne(null)).rejects.toThrow(NotFoundException);
      expect(mockPrisma.article.findUnique).toHaveBeenCalledTimes(2);
      expect(mockPrisma.article.findUnique).toHaveBeenCalledWith({
        where: {id: null},
        include: {
          author: true,
        },
      });
    });
  });
});

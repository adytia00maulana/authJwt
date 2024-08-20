import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger } from '@nestjs/common';
describe('ArticlesController', () => {
  let controller: ArticlesController;

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

  // Testing Find All
  it('should return array articles', () => {
    const result = controller.findAll();
    expect(result).toEqual(result); // Must Fix This Expected Result;
  });

  // Testing Find by ID
  it('should return article by ID', () => {
    const result = controller.findOne(1);
    expect(result).toEqual(result); // Must Fix This Expected Result;
  });
});

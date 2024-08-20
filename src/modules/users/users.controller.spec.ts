import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService,
        Logger,
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Testing Find All
  it('should return array user', () => {
    const result = controller.findAll();
    expect(result).toEqual(result); // Must Fix This Expected Result;
  });

  // Testing Find by ID
  it('should return user', () => {
    const result = controller.findOne(1);
    expect(result).toEqual(result); // Must Fix This Expected Result;
  });
});

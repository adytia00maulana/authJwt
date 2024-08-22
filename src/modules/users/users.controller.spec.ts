import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Logger } from '@nestjs/common';

describe('UsersController', () => {
  let controller: UsersController;

  const mockService = {
    create: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn()
  }

  const mockUser = {
    id: 1,
    name: 'admin',
    email: 'admin@example.com',
    password: 'password',
    createdAt: new Date(),
    updatedAt: new Date(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        PrismaService,
        Logger,
        {
          provide: UsersService,
          useValue: mockService
        }
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Testing Create
  it("should create user", async () => {
    mockService.create.mockResolvedValue(mockUser);

    const result = await controller.create(mockUser);
    expect(result).toEqual(mockUser);
  });

  // Testing Update
  it("should update user", async () => {
    mockService.update.mockResolvedValue(mockUser);

    const result = await controller.update(mockUser.id.toString(), mockUser);
    expect(result).toEqual(mockUser);
  });

  // Testing Find All
  it('should return array user', async () => {
    mockService.findAll.mockResolvedValue([mockUser]);

    const result = await controller.findAll();
    expect(result).toEqual([mockUser]);
  });

  it('should return empty array if there are no users', async () => {
    mockService.findAll.mockResolvedValue([]);

    const result = await controller.findAll();
    expect(result).toEqual([]);
  });

  // Testing Find by ID
  it('should return user', async () => {
    mockService.findOne.mockResolvedValueOnce(mockUser);

    const result = await controller.findOne(mockUser.id);
    expect(result).toEqual(mockUser);
    expect(mockService.findOne).toHaveBeenCalledTimes(1);
    expect(mockService.findOne).toHaveBeenCalledWith(mockUser.id);
  });
});

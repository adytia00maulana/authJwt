import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from "../../prisma/prisma.service";
import { Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersController } from "./users.controller";
import { UserEntity } from "./entities/userEntity.entity";

describe('UsersService', () => {
  let service: UsersService;

  const mockPrisma = {
    create: jest.fn(),
    findOne: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    findUnique: jest.fn(),
    user: {
      findUnique: jest.fn(),
      findMany: jest.fn()
    },
  };

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
        CreateUserDto,
        UpdateUserDto,
        UserEntity,
        {
          provide: PrismaService,
          useValue: mockPrisma,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  // Testing Create
  describe('create', () => {
    it('should create and return a user', async () => {
      jest.spyOn(service, 'create').mockImplementationOnce(() => Promise.resolve(mockUser));

      const  result = await service.create(mockUser as CreateUserDto);

      expect(result).toEqual(mockUser);
    });
  });

  // Testing Update
  describe('update', () => {
    it('should update and return a user', async () => {
      const updateUser = {
        id: 1,
        name: 'admin1',
        email: 'admin@example.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'update').mockResolvedValue(updateUser);

      const  result = await service.update(updateUser.id, updateUser as UpdateUserDto);

      expect(result).toEqual(updateUser);
    });
  });

  // Testing Find All
  describe('findAll', () => {
    it('should return all user', async () => {
      const allUser = [mockUser];

      mockPrisma.user.findMany.mockResolvedValue(allUser);

      const result = await service.findAll();
      expect(result).toEqual(allUser);
    });

    it('should return empty array if there are no users', async () => {
      mockPrisma.user.findMany.mockResolvedValue([]);

      const result = await service.findAll();
      expect(result).toEqual([]);
    });
  });

  // Testing Find By id
  describe('findOne', () => {
    it('should find and return a user by ID', async () => {
      mockPrisma.user.findUnique.mockResolvedValueOnce(mockUser);

      const result = await service.findOne(mockUser.id);
      expect(result).toEqual(mockUser);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(1);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: mockUser.id },
      });
    });

    it('should throw NotFoundException if user is not found', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      await expect(service.findOne(null)).rejects.toThrow(NotFoundException);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledTimes(2);
      expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: null },
      });
    });
  });
});

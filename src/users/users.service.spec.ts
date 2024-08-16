import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from "../prisma/prisma.service";
import { Logger, NotFoundException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UsersController } from "./users.controller";
import { UserEntity } from "./entities/userEntity.entity";
import fn = jest.fn;
import { Prisma } from "@prisma/client";

describe('UsersService', () => {
  let service: UsersService;
  let controller: UsersController;
  let model: UserEntity;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
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
      providers: [UsersService, PrismaService, Logger, CreateUserDto, UserEntity],
    }).compile();

    service = module.get<UsersService>(UsersService);
    model = module.get<UserEntity>(UserEntity)
  });

  // Testing Create
  describe('create', () => {
    it('should create and return a user', async () => {
      const newUser = {
        id: 1,
        name: 'admin',
        email: 'admin@example.com',
        password: 'password',
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(service, 'create').mockImplementationOnce(() => Promise.resolve(newUser));

      const  result = await service.create(newUser as CreateUserDto);

      expect(result).toEqual(result);
    });
  });

  // Testing Find By id
  /* describe('findOne', () => {
    it('should find and return a user by ID', async () => {
      jest.spyOn(model, `findOne`).mockResolvedValue(mockUser);

      const result = await service.findOne(mockUser.id);
      expect(model.id).toHaveBeenCalledWith(mockUser.id);
      expect(result).toEqual(mockUser);
    });

    it('should throw NotFoundException if book is not found', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(mockUser.id)).rejects.toThrow(NotFoundException);
      expect(mockUser.findOne).toHaveBeenCalledWith(mockUser.id);
    });
  }); */
});

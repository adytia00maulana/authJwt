import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../prisma/prisma.service";
import * as argon2 from "argon2";

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService, private readonly logger: Logger) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await argon2.hash(createUserDto.password,{ hashLength: roundsOfHashing });
    this.logger.log(`${UsersService.name} - created with body ${JSON.stringify(createUserDto)}`);

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    this.logger.log(`${UsersService.name} - Find All`);
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    this.logger.log(`${UsersService.name} - Find By Id ${id}`);

    const user = await this.prisma.user.findUnique({ where: { id } });
    if(!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password, { hashLength: roundsOfHashing });
    }
    this.logger.log(`${UsersService.name} - Update By Id ${id} With Body ${JSON.stringify(updateUserDto)}`);

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    this.logger.log(`${UsersService.name} - Delete By Id ${id}`);
    return this.prisma.user.delete({ where: { id } });
  }
}

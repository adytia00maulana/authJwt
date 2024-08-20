import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "../../prisma/prisma.service";
import * as argon2 from "argon2";

export const roundsOfHashing = 10;

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService, private readonly logger: Logger) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await argon2.hash(createUserDto.password,{ hashLength: roundsOfHashing });
    this.logger.log(`${UsersService.name} - created with body ${JSON.stringify(createUserDto)}`);

    return this.prismaService.user.create({
      data: createUserDto,
    });
  }

  findAll() {
    this.logger.log(`${UsersService.name} - Find All`);
    return this.prismaService.user.findMany();
  }

  async findOne(id: number) {
    this.logger.log(`${UsersService.name} - Find By Id ${id}`);

    const user = await this.prismaService.user.findUnique({ where: { id } });
    if(!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await argon2.hash(updateUserDto.password, { hashLength: roundsOfHashing });
    }
    this.logger.log(`${UsersService.name} - Update By Id ${id} With Body ${JSON.stringify(updateUserDto)}`);

    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    this.logger.log(`${UsersService.name} - Delete By Id ${id}`);
    return this.prismaService.user.delete({ where: { id } });
  }
}

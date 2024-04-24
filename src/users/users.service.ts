import { ConflictException, Injectable } from '@nestjs/common';
import { hashSync as bcryptHashSync } from 'bcryptjs';
import { UserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async create(newUser: UserDto) {
    const userAlreadyRegistered = await this.findByUserName(newUser.username);
    if (userAlreadyRegistered)
      throw new ConflictException(
        `Username ${newUser.username} already in use`,
      );

    const dbuser = new UserEntity();
    dbuser.username = newUser.username;
    dbuser.password = bcryptHashSync(newUser.password, 10);

    const { id, username } = await this.usersRepository.save(dbuser);

    return { id, username };
  }

  async findByUserName(username: string): Promise<UserDto | null> {
    const userFound = await this.usersRepository.findOne({
      where: { username },
    });

    if (!userFound) return null;

    return {
      id: userFound.id,
      username: userFound.username,
      password: userFound.password,
    };
  }
}

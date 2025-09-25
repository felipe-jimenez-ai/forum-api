// import { Injectable } from '@nestjs/common';

// export type User = any;

// @Injectable()
// export class UsersService {
//   private readonly users = [
//     {
//       userId: 1,
//       username: 'testuser',
//       // The password is 'testpassword' hashed with bcrypt
//       password: '$2b$10$k4oyaJO4CZSyqIqFRX2RbOHc2W5a1kDlcMh1PllWq/0pUFLMvtKae',
//     },
//   ];

//   async findOne(username: string): Promise<User | undefined> {
//     return this.users.find(user => user.username === username);
//   }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../forum/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async onModuleInit() {
    // Seed the user if it doesn't exist
    const userExists = await this.usersRepository.findOneBy({ username: 'testuser' });
    if (!userExists) {
      const hashedPassword = await bcrypt.hash('testpassword', 10);
      const seedUser = this.usersRepository.create({ username: 'testuser', password: hashedPassword });
      await this.usersRepository.save(seedUser);
    }
  }
  
  async findOne(username: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ username });
  }
}


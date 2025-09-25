import { Injectable, Logger } from '@nestjs/common'; // Import Logger
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name); // Add this logger

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    this.logger.log(`[validateUser] Looking for user: "${username}"`);
    const user = await this.usersService.findOne(username);

    // 1. Did we find a user?
    if (!user) {
        this.logger.error(`[validateUser] FAILED: User not found.`);
        return null;
    }
    this.logger.log(`[validateUser] SUCCESS: User found.`);

    // 2. Does the password match?
    this.logger.log(`[validateUser] Comparing provided password with stored hash.`);
    const isMatch = await bcrypt.compare(pass, user.password);
    
    if (!isMatch) {
        this.logger.error(`[validateUser] FAILED: Password does not match.`);
        return null;
    }
    
    this.logger.log(`[validateUser] SUCCESS: Password matches.`);
    const { password, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

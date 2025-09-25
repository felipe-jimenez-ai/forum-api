import { Controller, Post, Body, UnauthorizedException, ValidationPipe, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name); // Add this logger

    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body(new ValidationPipe()) loginDto: LoginAuthDto) {
        // Log the incoming username
        this.logger.log(`Login attempt for username: "${loginDto.username}"`);

        const user = await this.authService.validateUser(loginDto.username, loginDto.password);
        if (!user) {
            this.logger.warn(`Validation failed for username: "${loginDto.username}"`);
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }
}

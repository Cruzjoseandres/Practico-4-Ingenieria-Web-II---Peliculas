import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: LoginDto) {
        try {
            const user = await this.authService.login(dto);
            return user;
        } catch (error) {
            console.error(error);
            throw new UnauthorizedException('Credenciales inválidas');
        }
    }
}

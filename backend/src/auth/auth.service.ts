import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService
    ) {}

    async login(loginDto: LoginDto) {
        const usuario = await this.usersService.findByUsername(loginDto.username);
        if (!usuario) {
            throw new UnauthorizedException('Credenciales inválidas');
        }

        const passwordMatches = await bcrypt.compare(loginDto.password, usuario.password);
        if (!passwordMatches) {
            throw new UnauthorizedException('Credenciales inválidas');
        }
        const usuarioobj = {
            id: usuario.id,
            username: usuario.username,
            fullName: usuario.fullName,
        };
        const payload = { username: usuario.username, sub: usuario.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: usuarioobj,
        };
    }

    async register(registerDto: RegisterDto) {
        const newUser = await this.usersService.create(registerDto);
        return newUser;
    }
}

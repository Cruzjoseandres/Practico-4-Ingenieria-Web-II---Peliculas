import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(username: string, password: string) {
        const user = await this.usersService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const usuario = {
                id: user.id,
                username: user.username,
                fullName: user.fullName,
            };
            return usuario;
        }
        throw new UnauthorizedException('Credenciales inválidas');
    }

    async login(user: User) {
        const payload = { username: user.username, sub: user.id };
        return Promise.resolve({
            access_token: this.jwtService.sign(payload),
            user,
        });
    }
}

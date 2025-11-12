import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { JwtPayload } from 'jsonwebtoken';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'mi-secreto-super-seguro-cambiar',
        });
    }

    async validate(payload: JwtPayload): Promise<any> {
        const user = await this.userService.findByUsername(payload.username);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return { username: user.username, sub: user.id };
    }
}

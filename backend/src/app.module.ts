import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MovieModule } from './movie/movie.module';
import { ReviewModule } from './review/review.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './Config/database.config';

import { IsJsonValidMiddleware } from './middleware/is-json-valid/is-json-valid.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        TypeOrmModule.forRoot(typeOrmConfig),
        UserModule,
        MovieModule,
        ReviewModule,
        AuthModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(IsJsonValidMiddleware).forRoutes({
            path: 'user',
            method: RequestMethod.POST,
        });
    }
}
